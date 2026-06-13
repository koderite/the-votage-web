'use client'

import { useState, useRef } from 'react'
import { X, ChevronDown, Upload, FileSpreadsheet, AlertCircle } from 'lucide-react'
import { DEPARTMENTS } from '@/components/admin/data/members'

interface AddMemberModalProps {
  onClose: () => void
  onAdd?: (member: {
    name: string
    phone: string
    email: string
    gender: 'Male' | 'Female'
    department: string
    maritalStatus: string
    joined: string
  }) => void
}

type ModalMode = 'manual' | 'import'

const statuses = ['Pending', 'Active', 'Inactive']

export function AddMemberModal({ onClose, onAdd }: AddMemberModalProps) {
  const [mode, setMode] = useState<ModalMode>('manual')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Male',
    department: 'RMG (Choir)',
    maritalStatus: 'Single',
  })
  const [file, setFile] = useState<File | null>(null)
  const [importPreview, setImportPreview] = useState<any[] | null>(null)
  const [importErrors, setImportErrors] = useState<string[]>([])
  const [importing, setImporting] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const inputClass =
    'w-full px-3 py-3 bg-gray-50 rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-100 border border-transparent'

  function handleManualSubmit() {
    if (!form.firstName || !form.lastName) return
    onAdd?.({
      name: `${form.firstName} ${form.lastName}`,
      phone: form.phone,
      email: form.email,
      gender: form.gender as 'Male' | 'Female',
      department: form.department,
      maritalStatus: form.maritalStatus,
      joined: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
    })
    onClose()
  }

  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) processFile(f)
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) processFile(f)
  }

  function processFile(file: File) {
    setFile(file)
    const ext = file.name.split('.').pop()?.toLowerCase()

    if (ext === 'csv') {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        parseCSV(text)
      }
      reader.readAsText(file)
    } else if (ext === 'xlsx' || ext === 'xls') {
      // For xlsx, we'd normally use SheetJS. Without it, try CSV-like parsing.
      setImportErrors(['XLSX files require the xlsx library. Try saving as CSV instead.'])
    } else {
      setImportErrors(['Unsupported file format. Use .csv or .xlsx'])
    }
  }

  function parseCSV(text: string) {
    const lines = text.split('\n').filter(l => l.trim())
    if (lines.length < 2) {
      setImportErrors(['File is empty or has only headers'])
      return
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
    const rows = lines.slice(1).map(line => {
      const vals = line.split(',').map(v => v.trim())
      const row: Record<string, string> = {}
      headers.forEach((h, i) => { row[h] = vals[i] ?? '' })
      return row
    })

    setImportPreview(rows.slice(0, 5))
    setImportErrors([])
  }

  function handleImportAll() {
    if (!importPreview || !file) return

    setImporting(true)
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split('\n').filter(l => l.trim())
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase())

      let imported = 0
      let skipped = 0

      for (let i = 1; i < lines.length; i++) {
        const vals = lines[i].split(',').map(v => v.trim())
        const row: Record<string, string> = {}
        headers.forEach((h, j) => { row[h] = vals[j] ?? '' })

        const firstName = row['first name'] || row['firstname'] || row['first_name'] || ''
        const lastName = row['last name'] || row['lastname'] || row['last_name'] || ''
        const name = `${firstName} ${lastName}`.trim()

        if (!firstName && !lastName) {
          skipped++
          continue
        }

        onAdd?.({
          name,
          phone: row['phone'] || row['phone no'] || row['phone_no'] || row['telephone'] || '',
          email: row['email'] || row['email address'] || '',
          gender: (row['gender']?.toLowerCase() === 'male' ? 'Male' : 'Female') as 'Male' | 'Female',
          department: row['department'] || row['dept'] || 'RMG (Choir)',
          maritalStatus: row['marital status'] || row['marital_status'] || row['status'] || 'Single',
          joined: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
        })
        imported++
      }

      setImporting(false)
      onClose()
    }
    reader.readAsText(file)
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={18} className="text-gray-400" />
        </button>

        <h2 className="text-xl font-bold text-[#111827] mb-1">Add New Members</h2>
        <p className="text-sm text-[#6B7280] mb-6">Fill in the details or import from file</p>

        {/* Mode toggle */}
        <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg w-fit">
          <button
            onClick={() => setMode('manual')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'manual' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
          >
            Manual Entry
          </button>
          <button
            onClick={() => setMode('import')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'import' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
          >
            <Upload size={14} /> Import
          </button>
        </div>

        {mode === 'manual' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-[#374151] mb-1.5 block">First Name</label>
                <input
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  placeholder="Ada"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-sm text-[#374151] mb-1.5 block">Last Name</label>
                <input
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  placeholder="Stella"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-[#374151] mb-1.5 block">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="mike@gmail.com"
                  type="email"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-sm text-[#374151] mb-1.5 block">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="0803 000 0000"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-[#374151] mb-1.5 block">Gender</label>
                <div className="relative">
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className={`${inputClass} appearance-none pr-8`}
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="col-span-1">
                <label className="text-sm text-[#374151] mb-1.5 block">Marital Status</label>
                <div className="relative">
                  <select
                    value={form.maritalStatus}
                    onChange={(e) => setForm({ ...form, maritalStatus: e.target.value })}
                    className={`${inputClass} appearance-none pr-8`}
                  >
                    <option>Single</option>
                    <option>Married</option>
                    <option>Widowed</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-sm text-[#374151] mb-1.5 block">Department</label>
                <div className="relative">
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className={`${inputClass} appearance-none pr-8`}
                  >
                    {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* File drop zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
            >
              <input
                ref={fileRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                className="hidden"
              />
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <FileSpreadsheet size={24} className="text-green-500" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-[#111827]">{file.name}</p>
                    <p className="text-xs text-[#6B7280]">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
              ) : (
                <>
                  <Upload size={28} className="mx-auto text-[#9CA3AF] mb-2" />
                  <p className="text-sm text-[#6B7280]">Drop your CSV/Excel file here</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">or click to browse</p>
                </>
              )}
            </div>

            {importErrors.length > 0 && (
              <div className="mt-3 p-3 bg-red-50 rounded-lg flex items-start gap-2">
                <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
                <div className="text-xs text-red-700">
                  {importErrors.map((err, i) => <p key={i}>{err}</p>)}
                </div>
              </div>
            )}

            {importPreview && importPreview.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-[#111827] mb-2">Preview ({importPreview.length} rows)</p>
                <div className="overflow-x-auto border border-gray-100 rounded-lg">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50">
                        {Object.keys(importPreview[0]).map((h) => (
                          <th key={h} className="px-2 py-1.5 text-left font-medium text-[#374151] capitalize">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {importPreview.map((row, i) => (
                        <tr key={i} className="border-t border-gray-50">
                          {Object.values(row).map((val, j) => (
                            <td key={j} className="px-2 py-1.5 text-[#6B7280]">{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {file && !importErrors.length && importPreview && (
              <p className="text-xs text-[#6B7280] mt-2">
                Column headers are auto-detected. Supported: first name, last name, email, phone, gender, department, marital status.
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-sm text-[#374151] bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          {mode === 'manual' ? (
            <button
              onClick={handleManualSubmit}
              className="px-5 py-2.5 rounded-full text-sm text-white bg-[#111827] hover:bg-[#1f2937] transition-colors"
            >
              Add member
            </button>
          ) : (
            <button
              onClick={handleImportAll}
              disabled={!file || importErrors.length > 0 || importing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white bg-[#111827] hover:bg-[#1f2937] transition-colors disabled:opacity-50"
            >
              {importing ? 'Importing...' : 'Import All'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
