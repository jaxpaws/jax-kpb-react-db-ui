import { Metadata } from 'next';
import ServicesForm from './servicesForm';

export const metadata: Metadata = {
  title: 'Enter Data | WARD',
  description: 'Enter reporting data for various KPB activities',
  icons: ['./favicon.png']
};

export default function Page() {
  return(
      <main id="main-content" className="px-2 sm:px-4 md:px-8">
          <h1 id="main-content-header" className="text-xl md:text-2xl" tabIndex={-1}>Enter Data: Services Data</h1>
          <ServicesForm></ServicesForm>
      </main>
  );
}