import InputFileUpload from '@/components/InputFileUpload';

export default function UploadPage() {
  return (
    <div>
      <InputFileUpload acceptedTypes=".pdf" maxSize={10} />
    </div>
  );
}
