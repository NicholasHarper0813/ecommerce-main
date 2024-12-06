import express from 'express';

declare module 'express' {
  interface Request extends express.Request {
    user: any;
  }
}
