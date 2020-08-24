// Configure logic to toggle inputs when different from student info


// module to reference checkboxes and containers

const form = (() => {
  // reference checkboxes
  const parentAddressCheckbox = document.getElementById('sameaddress');
  const tuitionPatronCheckbox = document.getElementById('sametuition');

  // reference input containers
  const parentAddress = document.getElementById('paddressContainer');
  const tuitionPatronFirst = document.getElementById('tFirstName');
  const tuitionPatronLast = document.getElementById('tLastName');
  const tuitionAddress = document.getElementById('taddressContainer');
  const tuitionPhoneEmail = document.getElementById('tuitionInfo');

  return {
    parentAddressCheckbox,
    tuitionPatronCheckbox,
    parentAddress,
    tuitionPatronFirst,
    tuitionPatronLast,
    tuitionAddress,
    tuitionPhoneEmail,
  }
})();

// module to handle logic

// eslint-disable-next-line no-unused-vars
const handleCheckbox = (() => {
  form.parentAddressCheckbox.addEventListener('click', () => {
    form.parentAddress.toggleAttribute('hidden');
  });

  form.tuitionPatronCheckbox.addEventListener('click', () => {
    form.tuitionPatronFirst.toggleAttribute('hidden');
    form.tuitionPatronLast.toggleAttribute('hidden');
    form.tuitionAddress.toggleAttribute('hidden');
    form.tuitionPhoneEmail.toggleAttribute('hidden');
  });
})();