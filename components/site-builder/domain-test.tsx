'use client';

import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Link, Globe } from 'lucide-react';

export const DomainTest = () => {
  const [domainType, setDomainType] = useState('subdominio');
  const [subdomain, setSubdomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Prueba de Configuración de Dominio</h2>
      
      <div className="space-y-4">
        <Label className="text-sm font-medium">Tipo de Dominio</Label>
        <RadioGroup
          value={domainType}
          onValueChange={(value) => {
            console.log('RadioGroup cambiado a:', value);
            setDomainType(value);
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="subdominio" id="subdominio" />
            <Label htmlFor="subdominio" className="cursor-pointer">
              <div className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                <span>Subdominio de Vendes</span>
              </div>
              <p className="text-sm text-gray-500">micomercio.vendes.com</p>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="propio" id="propio" />
            <Label htmlFor="propio" className="cursor-pointer">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Dominio Propio</span>
              </div>
              <p className="text-sm text-gray-500">micomercio.com</p>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {domainType === 'subdominio' && (
        <div className="space-y-2">
          <Label htmlFor="subdomain" className="text-sm font-medium">Subdominio *</Label>
          <div className="flex items-center">
            <Input
              id="subdomain"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
              placeholder="micomercio"
              className="rounded-r-none"
            />
            <div className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-600">
              .vendes.com
            </div>
          </div>
          {subdomain && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800 mb-1">
                URL de tu sitio web:
              </p>
              <p className="text-sm text-blue-600 font-mono bg-white px-2 py-1 rounded border">
                https://{subdomain}.vendes.com
              </p>
            </div>
          )}
        </div>
      )}

      {domainType === 'propio' && (
        <div className="space-y-2">
          <Label htmlFor="customDomain" className="text-sm font-medium">Dominio Propio *</Label>
          <div className="flex items-center">
            <Input
              id="customDomain"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="micomercio"
              className="rounded-r-none"
            />
            <div className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-600">
              .com
            </div>
          </div>
          {customDomain && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800 mb-1">
                URL donde estará disponible tu página web:
              </p>
              <p className="text-sm text-blue-600 font-mono bg-white px-2 py-1 rounded border">
                https://{customDomain}.com
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
        <p><strong>Debug:</strong> Tipo de dominio: "{domainType}"</p>
        <p>Subdominio: "{subdomain}"</p>
        <p>Dominio propio: "{customDomain}"</p>
      </div>
    </div>
  );
};
