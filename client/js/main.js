import FormComponent from "./components/form-component.js";
import topTierValidator from "./helpers/validators/todo-validator.js";
import ApiService from "./helpers/api-service.js";

const TopTierList = document.querySelector('.js-todo-list');
const updateFormModal = new bootstrap.Modal('#update-form-modal');
const updateNameField = document.querySelector('#update-name-input');
const updateEmailField = document.querySelector('#update-email-input');
const updateCompletedField = document.querySelector('#update-completed-input');
const btnUpdateTopTier = document.querySelector('#btn-update-topTier');
let editableTodoId = null;
let editableTopTierItemText = null;
let editableTopTierEmail = null;
let editableCheckbox = null;

const updateTopTier = async () => {
  const { name, email, completed } = await ApiService.updateTopTier({
    id: editableTodoId,
    name: updateNameField.value,
    email: updateEmailField.value,
    completed: updateCompletedField.checked,
  });
  editableTopTierItemText.innerText = name;
  editableCheckbox.classList.remove('checked');
  if (completed) editableCheckbox.classList.add('checked');

  editableTodoId = null;
  editableTopTierItemText = null;
  editableTopTierEmail = null;
  editableCheckbox = null;
}

const addTierItem = ({
  id,
  name,
  email,
  completed,
}) => {
  const topTierItem = document.createElement('div');
  topTierItem.className = 'todo-list__item';

  const emailItem = document.createElement('div');
  emailItem.className = 'todo-list__item__text';
  emailItem.innerText = email;

  const checkbox = document.createElement('div');
  checkbox.className = 'checkbox';  //
  if (completed) checkbox.classList.add('checked');
  checkbox.addEventListener('click', async () => {
    await ApiService.updateTopTier({
      id,
      completed: !checkbox.classList.contains('checked')
    });

    checkbox.classList.toggle('checked');
  });

  const nameItemText = document.createElement('div');
  nameItemText.className = 'todo-list__item__text';
  nameItemText.innerText = name;

  const btnUpdate = document.createElement('button');
  btnUpdate.className = 'button';
  btnUpdate.innerText = '↻';
  btnUpdate.addEventListener('click', () => {
    updateNameField.value = nameItemText.innerText;
    updateEmailField.value = emailItem.innerText;
    updateCompletedField.checked = checkbox.classList.contains('checked');
    editableTodoId = id;
    editableTopTierItemText = nameItemText;
    editableTopTierEmail = emailItem;
    editableCheckbox = checkbox;

    updateFormModal.show();
  });
  const btnDelete = document.createElement('button');
  btnDelete.className = 'button';
  btnDelete.innerText = '✖';
  btnDelete.addEventListener('click', async () => {
    await ApiService.deleteTopTier(id);
    topTierItem.remove();
  });

  topTierItem.append(
    nameItemText,
    emailItem,
    checkbox,
    btnUpdate,
    btnDelete,
  );

  TopTierList.insertAdjacentElement('beforebegin', topTierItem);
}
const formAddTopTier = new FormComponent(
  '.js-add-todo-form', /* selector */
  topTierValidator, /* formatErrors */
  async ({ id, name, email }) => {
    const createdTopTier = await ApiService.createTopTier({ id, name, email });
    addTierItem(createdTopTier);
  } /* onSuccess */
);

// Pradinių duomenų parsiuntimas
const topTiers = await ApiService.fetchTopTiers();
topTiers.forEach(addTierItem);

btnUpdateTopTier.addEventListener('click', () => {
  updateTopTier();
  updateFormModal.hide();
});