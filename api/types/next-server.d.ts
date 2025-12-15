declare module 'next/server' {
  // Minimal shims for Vercel serverless function types
  export interface NextRequest extends Request {}
  export class NextResponse {
    static json(body: any, init?: ResponseInit): Response;
  }
}

