      document.addEventListener("DOMContentLoaded", function () {
        const containerRepeater = document.getElementById('devices-repeater');
        
        const devices = [
          {
            icon: 'https://img.icons8.com/ios/512/ffffff/earbud-headphones-airpods-pro.png',
            name: 'Earphones',
            description: 'Your Earphones Setting',
            link: '#device1'
          },
          {
            icon: 'https://img.icons8.com/ios/512/ffffff/iphone14-pro.png',
            name: 'Phone',
            description: 'Your Phone Settings',
            link: '#device2'
          },
          {
            icon: 'https://img.icons8.com/ios/512/ffffff/apple-watch.png',
            name: 'Smartwatch',
            description: 'Your Smartwatch Settings',
            link: '#device3'
          },
          {
            icon: 'https://img.icons8.com/ios/512/ffffff/aipods-pro-max.png',
            name: 'Headphones',
            description: 'Your Headphones Settings',
            link: '#device3'
          },
          {
            icon: 'https://img.icons8.com/ios/512/ffffff/tesla-model-3.png',
            name: 'Car App',
            description: 'Your Car App Settings',
            link: '#device3'
          },
          {
            icon: 'https://img.icons8.com/ios/512/ffffff/mac-book-air.png',
            name: 'Laptop',
            description: 'Your Laptop Settings',
            link: '#device3'
          }
                      ];

        // Function to create URL-friendly strings (if needed)
        function createSlug(name) {
            return name.toLowerCase().replace(/\s+/g, '-');
        }

        // Create containers dynamically with device data
        devices.forEach(device => {
            const containerItem = document.createElement('div');
            containerItem.classList.add('devices-repeater-item');

            // Create the link element that will wrap the entire containerItem
            const link = document.createElement('a');
            link.href = device.link;
            link.classList.add('device-link'); // Add a class for styling if needed

            // Append content to containerItem
            containerItem.innerHTML = `
                <img src="${device.icon}" alt="${device.name}">
                <div class="text-content">
                    <div class="device-name">${device.name}</div>
                    <div class="device-description">${device.description}</div>
                </div>
            `;

            // Append the containerItem to the link
            link.appendChild(containerItem);

            // Append the link to the repeater container
            containerRepeater.appendChild(link);
        });
    });



    // just in case

