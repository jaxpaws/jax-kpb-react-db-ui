import ServicesForm from './servicesForm';

export default function Page() {
  return(
      <main id="main-content" className="px-8">
          <h1 className="text-2xl" tabIndex={0}>Enter Data: Services Data</h1>
          <ServicesForm></ServicesForm>
      </main>
  );
}