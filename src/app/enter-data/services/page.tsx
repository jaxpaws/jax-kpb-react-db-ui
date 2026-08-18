import { Metadata } from 'next';
import { ServicesForm } from './servicesForm';

export const metadata: Metadata = {
  title: 'Enter Data | WARD',
  description: 'Enter reporting data for various KPB activities',
  icons: ['./favicon.png']
};

export default function EnterServicesData() {
  return(
      <main id="main-content" className="px-2 sm:px-4 md:px-8">
          <ServicesForm></ServicesForm>
      </main>
  );
}