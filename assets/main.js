function removeDevices() {
    let devices = document.querySelectorAll(".device");
    devices.forEach((device) => {
        device.remove();
    });
}
function getMedias() {
    return [
        {
            width: 320,
            height: 480,
            name: "break-x-small",
        },
        {
            width: 481,
            height: 736,
            name: "break-small",
        },
        {
            width: 641,
            height: 812,
            name: "break-medium",
        },
        {
            width: 961,
            height: 1024,
            name: "break-x-medium",
        },
        {
            width: 1025,
            height: 768,
            name: "break-large",
        },
        {
            width: 1281,
            height: 1080,
            name: "break-x-large",
        },
    ];
}
function getDevices() {
    return [
        {
            width: 375,
            height: 667,
            name: "iPhone 6/7/8 iOS 11",
        },
        {
            width: 414,
            height: 736,
            name: "iPhone 6/7/8 Plus iOS 11",
        },
        {
            width: 375,
            height: 812,
            name: "iPhone X/XS iOS 12",
        },
        {
            width: 768,
            height: 1024,
            name: "iPad",
        },
        {
            width: 1368,
            height: 768,
            name: "Standard Desktop",
        },
        {
            width: 1920,
            height: 1080,
            name: "HD Desktop",
        },
    ];
}
function getDevices() {
    return [
        {
            width: 375,
            height: 667,
            name: "iPhone 6/7/8 iOS 11",
            rotate: true,
        },
        {
            width: 414,
            height: 736,
            name: "iPhone 6/7/8 Plus iOS 11",
            rotate: true,
        },
        {
            width: 375,
            height: 812,
            name: "iPhone X/XS iOS 12",
            rotate: true,
        },
        {
            width: 768,
            height: 1024,
            name: "iPad",
            rotate: true,
        },
        {
            width: 1368,
            height: 768,
            name: "Standard Desktop",
            rotate: false,
        },
        {
            width: 1920,
            height: 1080,
            name: "HD Desktop",
            rotate: false,
        },
    ];
}
function createDevices(type) {
    let url = document.getElementById("url").value;

    if (!url) return;
    
    let container = document.getElementById("devices");
    let devices;

    removeDevices();

    if (type == "devices") {
        devices = getDevices();
    } else {
        devices = getMedias();
    }

    devices.forEach((device) => {
        container.appendChild(createDevice(device, url));
    });

    // Landscape
    devices.forEach((device) => {
        if (device.rotate) {
            let tmp = device.width;
            device.width = device.height;
            device.height = tmp;
            container.appendChild(createDevice(device, url));
        }
    });
}
function calculateScale(width, height) {
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    let diffHeight = height + 120 - vh;
    let diffWidth = width + 120 - vw;

    if (diffHeight > 0 && diffHeight > diffWidth) {
        // Height overlaps more
        scale = 1 - diffHeight / height;
    } else if (diffWidth > 0) {
        // Width Overlaps More
        scale = 1 - diffWidth / width;
    } else {
        // No overlap
        scale = 1;
    }

    scale = Math.round(scale * 10) / 10;

    return scale;
}

function createDevice(device, url) {
    let wrapper = document.createElement("div");
    let header = document.createElement("div");
    let scaler = document.createElement("div");
    let screen = document.createElement("div");
    let iframe = document.createElement("iframe");

    let scale = device.scale || calculateScale(device.width, device.height);

    wrapper.classList.add("device");
    header.classList.add("header");
    scaler.classList.add("scaler");
    screen.classList.add("screen");
    iframe.classList.add("iframe");

    header.innerHTML =
        device.name +
        '<div class="size">' +
        device.width +
        " x " +
        device.height +
        "</div>";

    // Compensate for scale
    let diffWidth = (device.width - device.width * scale) * -1;
    let diffHeight = (device.height - device.height * scale) * -1;
    let diffFontSize = 16 * scale; // Formatter is breaking this calculation
    diffFontSize = 16 - diffFontSize;
    diffFontSize += 16;

    wrapper.style.transform = "scale(" + scale + ")";
    wrapper.style.marginRight = diffWidth + "px";
    wrapper.style.marginBottom = diffHeight + "px";
    header.style.fontSize = diffFontSize + "px";
    screen.style.width = device.width + "px";
    screen.style.height = device.height + "px";
    iframe.src = url;

    screen.appendChild(iframe);
    scaler.appendChild(screen);
    wrapper.appendChild(header);
    wrapper.appendChild(scaler);

    return wrapper;
}
