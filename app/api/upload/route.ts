import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  const filename = `${Date.now()}-${file.name}`
  const filepath = path.join(uploadDir, filename)

  await writeFile(filepath, buffer)

  return NextResponse.json({ message: 'Upload successful', filename })
}

// Get an upload

export async function GET(req: Request, res: Response) {
  return NextResponse.json({ images: "Hjere"}, { status: 200})
}
