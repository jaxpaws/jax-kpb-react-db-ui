import { Metadata } from 'next';
import { ServicesForm } from './servicesForm';
import { REPORTING_DATA_VALUES } from './servicesJson';

export const metadata: Metadata = {
  title: 'Enter Data | WARD',
  description: 'Enter reporting data for various KPB activities',
  icons: ['./favicon.png']
};

export default async function EnterServicesData() {
  return (
    <main id="main-content" className="px-2 sm:px-4 md:px-8">
      <ServicesForm
        isUpdate={false}
        selectedDataType={REPORTING_DATA_VALUES.cleanTeam}>
      </ServicesForm>
    </main>
  );
}