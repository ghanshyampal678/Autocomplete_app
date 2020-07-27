const input = document.getElementById('input');
const result = document.getElementById('result');

input.addEventListener('input', getInput);

function getInput(e) {
  fetch('data.json')
    .then((res) => res.json())
    .then((data) => {
      data = data.filter((info) => {
        // const regex = new RegExp(`^${input.value}`, 'gi');
        return (info.districts = info.districts.filter((district) => {
          const regex = new RegExp(`^${input.value}`, 'gi');
          return district.match(regex);
        }));
      });

      if (input.value == '') {
        data = [];
        result.innerHTML = '';
      }

      let output = '';

      data.forEach((info) => {
        info.districts.forEach((district) => {
          output += `
          <div class="card bg-dark">
          <div class="card-body">
          <h4 id="visit" class="text-warning" style="cursor:pointer">${district} (${info.state})</h4>
          </div>
          </div>
          `;
        });
      });

      result.innerHTML = output;
    });

  e.preventDefault();
}

document.addEventListener('click', visit);

function visit(e) {
  if (e.target.id == 'visit') {
    input.value = e.target.innerHTML;
    result.style.display = 'none';
  }

  e.preventDefault();
}
