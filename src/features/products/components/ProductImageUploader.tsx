import { useState, useCallback, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { getPresignedUrl, uploadCompleteImage, uploadToPresignedUrl, deleteImage } from '../api/productApi'
import type { ProductImage } from '../interface'
import ProductImageDeleteButton from './ProductImageDeleteButton'

interface Props {
  productId: number
  imageType: 'PRODUCT_CONTENT' | 'PRODUCT_THUMBNAIL'
  label: string
  initialImages?: ProductImage[]
  multiple?: boolean
  onSuccess?: () => void
}

export default function ProductImageUploader({ productId, imageType, label, initialImages = [], multiple = false, onSuccess }: Props) {
  const [previews, setPreviews] = useState<ProductImage[]>(initialImages)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setPreviews(initialImages)
  }, [initialImages])

  const getImageFileExtension = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'jpg':
      case 'jpeg':
        return 'JPG'
      case 'png':
        return 'PNG'
      case 'webp':
        return 'WEBP'
      default:
        return 'UNKNOWN'
    }
  }

  const handleUploadFiles = async (files: File[]) => {
    try {
      setUploading(true)
      for (const file of files) {
        const extension = getImageFileExtension(file)
        const { presignedUrl, imageKey } = await getPresignedUrl({
          productId,
          imageType,
          imageFileExtension: extension,
        })
        await uploadToPresignedUrl({ presignedUrl, file })
        await uploadCompleteImage({ imageKey })
      }
      onSuccess?.()
      if (inputRef.current) inputRef.current.value = ''
    } catch (err) {
      console.error('업로드 실패:', err)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (imageKey: string) => {
    try {
      await deleteImage({ imageKey })
      setPreviews((prev) => prev.filter((img) => img.imageKey !== imageKey))
      onSuccess?.()
    } catch (err) {
      console.error('이미지 삭제 실패:', err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? [])
    void handleUploadFiles(selected)
  }

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'))
    void handleUploadFiles(files)
  }, [])

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-3">
      <label className="block text-base font-semibold">{label}</label>

      <div
        className={`border-2 border-dashed rounded-md p-6 text-center transition-all ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p className="text-sm text-muted-foreground mb-2">드래그하여 업로드하거나 파일을 선택하세요.</p>

        <Input type="file" accept="image/*" multiple={multiple} onChange={handleChange} ref={inputRef} disabled={uploading} />
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {previews.map((img) => (
            <div key={img.imageKey} className="relative">
              <img src={`https://lunatalk-images.s3.ap-northeast-2.amazonaws.com/${img.imageUrl}`} alt="미리보기" className="w-full aspect-square object-cover rounded-md border" />
              <ProductImageDeleteButton onConfirm={() => handleDelete(img.imageKey)} />
            </div>
          ))}
        </div>
      )}

      {uploading && <p className="text-sm text-blue-500">업로드 중입니다...</p>}
    </div>
  )
}
