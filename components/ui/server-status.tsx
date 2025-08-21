'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getServerStatus } from '@/lib/config';
import { Wifi, WifiOff, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface ServerStatusProps {
  showDetails?: boolean;
  className?: string;
}

export const ServerStatus = ({ showDetails = false, className = '' }: ServerStatusProps) => {
  const [status, setStatus] = useState<{
    available: boolean;
    url: string;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const serverStatus = await getServerStatus();
      setStatus(serverStatus);
    } catch (error) {
              setStatus({
          available: false,
          url: 'http://localhost:3002/api/v1',
          message: 'Error al verificar el servidor'
        });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  if (!status) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <RefreshCw className="h-4 w-4 animate-spin text-gray-500" />
        <span className="text-sm text-gray-500">Verificando servidor...</span>
      </div>
    );
  }

  if (!showDetails) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {status.available ? (
          <Wifi className="h-4 w-4 vendes-text-secondary" />
        ) : (
          <WifiOff className="h-4 w-4 text-red-500" />
        )}
        <Badge variant={status.available ? 'default' : 'destructive'} className="text-xs">
          {status.available ? 'Online' : 'Offline'}
        </Badge>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {status.available ? (
            <CheckCircle className="h-5 w-5 vendes-text-secondary" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
          Estado del Servidor
        </CardTitle>
        <CardDescription>
          {status.message}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">URL:</span>
          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
            {status.url}
          </code>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Estado:</span>
          <Badge variant={status.available ? 'default' : 'destructive'}>
            {status.available ? 'Disponible' : 'No disponible'}
          </Badge>
        </div>

        <Button
          onClick={checkStatus}
          size="sm"
          variant="outline"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Verificar Estado
        </Button>
      </CardContent>
    </Card>
  );
};
