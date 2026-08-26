import { Metadata } from 'next';
import { OtherForm } from './otherForm';
import { REPORTING_DATA_VALUES } from './otherJson';

export const metadata: Metadata = {
  title: 'Enter Data | WARD',
  description: 'Enter reporting data for various KPB activities',
  icons: ['./favicon.png']
};

export default function EnterOtherData() {
    return (
        <main id="main-content" className="px-2 sm:px-4 md:px-8">
          <OtherForm
            isUpdate={false}
            selectedDataType={REPORTING_DATA_VALUES.bagSwap}>
          </OtherForm>
        </main>
      );
}