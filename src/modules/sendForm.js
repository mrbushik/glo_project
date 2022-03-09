 export const sendForm = ({
     formId,
     someElem = []
 }) => {
     const form = document.getElementById(formId);
     const statusBlock = document.createElement('div');
     const loadText = 'загрузка...';
     const errorText = 'Ошибка...';
     const successText = 'Спасибо, наш менеджер с вами свяжется';


     const validate = (list) => {
         let success = true;
         //  list.forEach((input) => {
         //      if (!input.classList.contains('success')) {
         //          success = false;
         //      }
         //  })
         return success;
     }

     const sendData = (data) => {
         return fetch(' https://jsonplaceholder.typicode.com/posts', {
             method: 'POST',
             body: JSON.stringify(data),
             headers: {
                 'Content-Type': 'application/json'
             }
         }).then(res => res.json());
     };
     const submitForm = () => {
         statusBlock.textContent = loadText;
         form.append(statusBlock);
         const formDate = new FormData(form);
         const formBody = {}
         const formElements = form.querySelectorAll('input')

         formDate.forEach((val, key) => {
             formBody[key] = val;
         })

         someElem.forEach((elem) => {
             const element = document.getElementById(elem.id);
             console.log(element);
             if (elem.type === 'block') {
                 formBody[elem.id] = element.textContent;
             } else if (elem.type === 'input') {
                 formBody[elem.id] = element.value;
             }
         })

         if (validate(formElements)) {
             sendData(formBody)
                 .then(data => {
                     console.log(data);
                     statusBlock.textContent = successText;
                     formElements.forEach(input => {
                         input.value = '';

                     })
                 })
                 .catch(error => {
                     statusBlock.textContent = errorText;
                 })
         } else {
             alert('данные не валидны');

         }
     };
     try {
         if (!form) {
             throw new Error('добавьте элемент')
         }
         form.addEventListener('submit', (e) => {
             e.preventDefault();
             submitForm();

         });
     } catch (error) {
         console.log(error.message);
     }


 };