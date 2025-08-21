import { SectionOrderTest } from '@/components/site-builder/section-order-test';

export default function TestSectionOrderPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Prueba de Reordenamiento de Secciones</h1>
        <SectionOrderTest />
      </div>
    </div>
  );
}
