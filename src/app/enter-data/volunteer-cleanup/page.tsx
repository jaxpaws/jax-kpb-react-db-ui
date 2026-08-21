import { Metadata } from 'next';
import { VolunteerCleanupForm } from './volunteerCleanupForm';
import { REPORTING_DATA_VALUES } from './volunteerCleanupJson';

export const metadata: Metadata = {
  title: 'Enter Data | WARD',
  description: 'Enter reporting data for various KPB activities',
  icons: ['./favicon.png']
};

export default async function EnterVolunteerCleanupData() {
  return (
    <main id="main-content" className="px-2 sm:px-4 md:px-8">
      <VolunteerCleanupForm
        isUpdate={false}
        selectedDataType={REPORTING_DATA_VALUES.adoptASpot}>
      </VolunteerCleanupForm>
    </main>
  );
}