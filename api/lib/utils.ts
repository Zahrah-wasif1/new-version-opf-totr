import { NextResponse } from 'next/server';

export function successResponse(data: any, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status }
  );
}

export function handleError(error: any) {
  console.error('Error:', error);
  
  if (error instanceof Error) {
    if (error.message === 'Unauthorized') {
      return errorResponse(error.message, 401);
    }
    if (error.message.includes('Forbidden')) {
      return errorResponse(error.message, 403);
    }
    return errorResponse(error.message, 500);
  }
  
  return errorResponse('Internal server error', 500);
}

