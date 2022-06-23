import { onFormSubmit } from './validation.js';
import { toggleForms, loadMap } from './map.js';
import { openSuccessPopup, openErrorPopup } from './form.js';

toggleForms(true);
loadMap();

onFormSubmit(openSuccessPopup, openErrorPopup);
