export const insertProducts = async (data) => {
	let html = '';
    
	data.forEach((element) => {

		html += `
    <div class="col-lg-3 col-md-6 col-sm-12">
        <div
            class="card shadow border border-warning m-1"
            style="width: 18rem;">
            <div
                class="card-header fw-bold bg-warning-subtle border-bottom border-warning-subtle">${element.name}
                <i class="fa-regular fa-circle me-3"></i>
            </div>
            <ul class="list-group list-group-flush ">
                <li class="list-group-item fw-medium ms-2 ">
                    Descripcion: ${element.description}
                </li>
                <li class="list-group-item fw-medium ms-2">Precio: ${element.price}</li>
            </ul>
        </div>
    </div>
`;

		document.getElementById('box-products').insertAdjacentHTML('beforeend', html);
	});
};
