import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import { MongoClient, type Collection } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

interface StoredQuotationLine {
  productId: string;
  sku: string;
  name: string;
  hsnCode: string;
  unitPrice: number;
  gstRate: number;
  quantity: number;
  subtotal: number;
  gstAmount: number;
  lineTotal: number;
}

interface StoredGstSlab {
  rate: number;
  taxableValue: number;
  gstAmount: number;
  itemCount: number;
}

interface ProformaDocument {
  referenceCode: string;
  customer: {
    fullName: string;
    company: string;
    email: string;
    phone: string;
    notes: string;
  };
  quotationAttached: boolean;
  quotation: {
    totalLineItems: number;
    totalUnits: number;
    subtotal: number;
    totalGst: number;
    grandTotal: number;
    gstSlabs: StoredGstSlab[];
    lines: StoredQuotationLine[];
  } | null;
  status: 'pending_review';
  createdAt: Date;
}

class MongoConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MongoConfigError';
  }
}

let clientPromise: Promise<MongoClient> | null = null;
let indexesInitialized = false;

async function getProformaCollection(): Promise<Collection<ProformaDocument>> {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri || uri.includes('<username>') || uri.includes('MY_MONGODB_URI')) {
    throw new MongoConfigError(
      'MongoDB is not configured. Set MONGODB_URI in your environment variables to save proforma requests.'
    );
  }

  if (!clientPromise) {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 6000,
    });
    clientPromise = client.connect().catch((err) => {
      clientPromise = null;
      throw err;
    });
  }

  const connectedClient = await clientPromise;
  const dbName = process.env.MONGODB_DB_NAME?.trim() || 'plum_and_thread';
  const collection = connectedClient.db(dbName).collection<ProformaDocument>('proforma_requests');

  if (!indexesInitialized) {
    indexesInitialized = true;
    collection
      .createIndexes([
        { key: { referenceCode: 1 }, unique: true },
        { key: { createdAt: -1 } },
      ])
      .catch(() => {
        indexesInitialized = false;
      });
  }

  return collection;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '256kb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    const uri = process.env.MONGODB_URI?.trim() || '';
    const configured = Boolean(uri && !uri.includes('<username>') && !uri.includes('MY_MONGODB_URI'));
    res.json({ ok: true, mongodbConfigured: configured });
  });

  app.post('/api/proforma', async (req: Request, res: Response) => {
    try {
      const body = req.body ?? {};
      const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
      const company = typeof body.company === 'string' ? body.company.trim() : '';
      const email = typeof body.email === 'string' ? body.email.trim() : '';
      const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
      const notes = typeof body.notes === 'string' ? body.notes.trim() : '';
      const attachQuote = Boolean(body.attachQuote);

      if (fullName.length < 2) {
        res.status(400).json({ error: 'Please provide a valid full name.' });
        return;
      }
      if (company.length < 2) {
        res.status(400).json({ error: 'Please provide a valid company or brand name.' });
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({ error: 'Please provide a valid business email address.' });
        return;
      }
      if (phone.replace(/\D/g, '').length < 10) {
        res.status(400).json({ error: 'Please provide a valid 10+ digit contact number.' });
        return;
      }

      let quotationData: ProformaDocument['quotation'] = null;
      if (attachQuote && body.quotation && Array.isArray(body.quotation.lines) && body.quotation.lines.length > 0) {
        const sanitizedLines: StoredQuotationLine[] = body.quotation.lines.map((line: Record<string, unknown>) => ({
          productId: String(line.productId ?? ''),
          sku: String(line.sku ?? ''),
          name: String(line.name ?? ''),
          hsnCode: String(line.hsnCode ?? ''),
          unitPrice: Number(line.unitPrice ?? 0),
          gstRate: Number(line.gstRate ?? 0),
          quantity: Math.max(1, Math.floor(Number(line.quantity ?? 1))),
          subtotal: Number(line.subtotal ?? 0),
          gstAmount: Number(line.gstAmount ?? 0),
          lineTotal: Number(line.lineTotal ?? 0),
        }));

        const sanitizedSlabs: StoredGstSlab[] = Array.isArray(body.quotation.gstSlabs)
          ? body.quotation.gstSlabs.map((slab: Record<string, unknown>) => ({
              rate: Number(slab.rate ?? 0),
              taxableValue: Number(slab.taxableValue ?? 0),
              gstAmount: Number(slab.gstAmount ?? 0),
              itemCount: Number(slab.itemCount ?? 0),
            }))
          : [];

        quotationData = {
          totalLineItems: Number(body.quotation.totalLineItems ?? sanitizedLines.length),
          totalUnits: Number(body.quotation.totalUnits ?? 0),
          subtotal: Number(body.quotation.subtotal ?? 0),
          totalGst: Number(body.quotation.totalGst ?? 0),
          grandTotal: Number(body.quotation.grandTotal ?? 0),
          gstSlabs: sanitizedSlabs,
          lines: sanitizedLines,
        };
      }

      const collection = await getProformaCollection();
      const referenceCode = `PT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const createdAt = new Date();

      const doc: ProformaDocument = {
        referenceCode,
        customer: {
          fullName,
          company,
          email: email.toLowerCase(),
          phone,
          notes,
        },
        quotationAttached: Boolean(quotationData),
        quotation: quotationData,
        status: 'pending_review',
        createdAt,
      };

      const insertResult = await collection.insertOne(doc);

      res.status(201).json({
        referenceCode,
        documentId: insertResult.insertedId.toString(),
        createdAt: createdAt.toISOString(),
        quotationAttached: doc.quotationAttached,
      });
    } catch (error) {
      if (error instanceof MongoConfigError) {
        res.status(503).json({ error: error.message });
        return;
      }
      console.error('MongoDB proforma insert error:', error);
      res.status(500).json({
        error: 'Unable to save proforma request to MongoDB right now. Please verify your database connection and try again.',
      });
    }
  });

  if (!IS_PRODUCTION) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Plum & Thread server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
