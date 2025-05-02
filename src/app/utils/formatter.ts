// utils/formatter.ts

export const formatPrice = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  interface DateFormatOptions {
    weekday?: 'long' | 'short' | 'narrow';
    year?: 'numeric' | '2-digit';
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    day?: 'numeric' | '2-digit';
    hour?: 'numeric' | '2-digit';
    minute?: 'numeric' | '2-digit';
    second?: 'numeric' | '2-digit';
    timeZoneName?: 'short' | 'long';
  }
  
  export const formatDate = (
    date: Date | string,
    options: DateFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  ): string => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(parsedDate.getTime())) {
      return 'Tanggal tidak valid';
    }
  
    return parsedDate.toLocaleDateString('id-ID', options);
  };
  
  export const formatDateTime = (
    date: Date | string,
    options: DateFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    }
  ): string => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(parsedDate.getTime())) {
      return 'Tanggal/waktu tidak valid';
    }
  
    return parsedDate.toLocaleTimeString('id-ID', options);
  };
  
  // Fungsi tambahan untuk format lainnya
  export const formatToIDR = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };