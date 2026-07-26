import ServicesForm from './servicesForm';

export default function Page() {
  return(
      <div className="px-8">
          <h1 className="text-2xl" tabIndex={0}>Enter Data: Services Data</h1>
          <ServicesForm></ServicesForm>
      </div>
  );
}

/*
window.addEventListener('load', function () {
  var comboBoxes: NodeListOf<Element> = document.querySelectorAll('.combobox-list');

  for (var i = 0; i < comboBoxes.length; i++) {
    var comboBox: Element = comboBoxes[i];
    var comboBoxNode: HTMLInputElement | null = comboBox.querySelector('input');
    var buttonNode: HTMLButtonElement | null = comboBox.querySelector('button');
    var listboxNode: HTMLElement | null = comboBox.querySelector('[role="listbox"]');

    if (comboBoxNode && buttonNode && listboxNode) {
      new ComboBoxAutocomplete(comboBoxNode, buttonNode, listboxNode);
    }
  }
});
*/