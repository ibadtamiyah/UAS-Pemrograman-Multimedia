document.addEventListener('DOMContentLoaded', getProducts);

function getProducts() {
    /*
        fetch('https://dummyjson.com/products') // Ganti URL_REST_API dengan URL yang sesuai
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Respons jaringan tidak baik: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data yang diterima dari REST API:', data);
                if (!Array.isArray(data)) {
                    throw new Error('Data yang diterima bukan merupakan array');
                }
                displayProducts(data);
            })
            .catch(error => console.error('Kesalahan mengambil atau memparsing data:', error));
    
    }
    */
    fetch('https://dummyjson.com/products') // Ganti URL_REST_API dengan URL yang sesuai
        .then(response => {
            if (!response.ok) {
                throw new Error(`Respons jaringan tidak baik: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data yang diterima dari REST API:', data);

            // Mengecek apakah ada properti 'products' yang berupa array
            const productsArray = Array.isArray(data.products) ? data.products : [];

            if (productsArray.length === 0) {
                console.log('Tidak ada produk yang ditemukan.');
                // Tindakan yang sesuai, seperti menampilkan pesan atau menghentikan eksekusi
                return;
            }

            displayProducts(productsArray);
        })
        .catch(error => console.error('Kesalahan mengambil atau memparsing data:', error));
}

function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    console.log('Menampilkan produk:', products);

    if (!Array.isArray(products)) {
        console.error('Data yang diterima bukan merupakan array');
        return;
    }

    if (products.length === 0) {
        console.log('Tidak ada produk yang ditemukan.');
        // Tindakan yang sesuai, seperti menampilkan pesan atau menghentikan eksekusi
        return;
    }

    products.forEach(product => {
        console.log('Detail produk:', product);
        const productCard = document.createElement('div');
        productCard.classList.add('product');

        const title = document.createElement('h3');
        title.textContent = product.title;

        const description = document.createElement('p');
        description.textContent = product.description;

        const price = document.createElement('p');
        price.textContent = `Price: $${product.price}`;

        const brand = document.createElement('p');
        brand.textContent = `Brand: ${product.brand}`;

        const image = document.createElement('img');
        image.src = product.images[0]; // Menggunakan gambar pertama dari array images

        productCard.appendChild(title);
        productCard.appendChild(description);
        productCard.appendChild(price);
        productCard.appendChild(brand);
        productCard.appendChild(image);

        productList.appendChild(productCard);
    });

}

function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    fetch('https://dummyjson.com/products') // Ganti URL_REST_API dengan URL yang sesuai
        .then(response => response.json())
        .then(data => {
            const productsArray = Array.isArray(data.products) ? data.products : [];

            const filteredProducts = productsArray.filter(product => {
                return product.title.toLowerCase().includes(searchTerm);
            });

            displayProducts(filteredProducts);
        })
        .catch(error => console.error('Error fetching data:', error));
}
