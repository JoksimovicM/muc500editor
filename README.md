# muc500editor

The muc500editor is an app created with Electron JS. The goal for this app is to simplify a repetitive process of editing XML-Files containing configs for devices. These devices are often of the same type and therefore have the same configuration. Instead of editing these devices over and over again, the app makes use of Device Configs, JSON-Files, and applies these to the XML-File handed to the app.

## Table of contents

<!-- TABLE OF CONTENTS -->
  * [Installation](#installation)
  * [Usage](#usage)
    * [Device Config Import](#device-config-import)
    * [Device Config Export](#device-config-export)
    * [Show Device Configs](#show-device-configs)
    * [Device Config Format](#device-config-format)
    * [Upload Device Handle](#upload-device-handle)
    * [Upload Meter Conf](#upload-meter-conf)
    * [Meter Conf Format](#meter-conf-format)

<!-- INSTALLATION -->
## Installation

## Usage

<!-- IMPORT -->
### Device Config Import
When uploading one or multiplie device configs, it's important to make sure that the format is correct. The format can be found under **[Device Config Format](#device-config-format)**.

<p>Open settings</p>
<img src="images/docs/open-settings.png" width="500">
<p></p>
<p>Click 'Import Device Configs'</p>
<img src="images/docs/device-config-import/press-import.png" width="500">
<p></p>
<p>Select Device Config</p>
<img src="images/docs/device-config-import/choose-config.png" width="500">
<p></p>
<p>Popup if import was succcessful</p>
<img src="images/docs/device-config-import/import-successful.png" width="500">

<p align="right">(<a href="#muc500editor">back to top</a>)</p>


<!-- EXPORT -->
### Device Config Export
You can export the Device Configs that are currently saved in the app into a ZIP-Folder.

<p>Open settings</p>
<img src="images/docs/open-settings.png" width="500">
<p>Click 'Export Device Configs'</p>
<img src="images/docs/device-config-export/press-export.png" width="500">
<p>Save Export ZIP</p>
<img src="images/docs/device-config-export/save-export.png" width="500">
<p>Message on Success</p>
<img src="images/docs/device-config-export/export-successful.png" width="500">
<img src="images/docs/device-config-export/saved-export.png" width="150">


<p align="right">(<a href="#muc500editor">back to top</a>)</p>


<!-- SHOW -->
### Show Device Configs

<p>Open settings</p>
<img src="images/docs/open-settings.png" width="500">
<p>Click 'Show Device Configs'</p>
<img src="images/docs/show-device-configs/press-show.png" width="500">
<p>Here you can copy, edit or delete the configs in the app</p>
<img src="images/docs/show-device-configs/existing-configs.png" width="500">

<p align="right">(<a href="#muc500editor">back to top</a>)</p>


<!-- DEVICE CONF FORMAT -->
### Device Config Format
The Device Configs are saved in a JSON-Format. The **filename** is a combination of the short form of the manufacturer, like **SON** and the version number like **25** -> **SON_25.device_conf**

<img src="images/docs/device-config-format.png" height="350">
<img src="images/docs/device-config-name.png" width="150">

One device can contain multiple measurement definitions. The structure of one measurement looks like this:
```js
"index": {
    "userscale": number,
    "userlabel": text
}
```

- index: The index in the Device Config is the same as the one in the Solvimus (See image below)
- userscale: With which scale should the data be uploaded
- userlabel: The label of the measurement e.g. 'MW01'

<img src="images/docs/device-config-format-index.png" height="300">

<p align="right">(<a href="#muc500editor">back to top</a>)</p>


<!-- UPLOAD HANDLE -->
### Upload Device Handle

<img src="images/docs/upload-device-handle/press-handle-upload.png" width="500">
<img src="images/docs/upload-device-handle/choose-handle.png" width="500">

<p align="right">(<a href="#muc500editor">back to top</a>)</p>


<!--UPLOAD METER -->
### Upload Meter Conf

<img src="images\docs\upload-meter-conf\press-meter-upload.png" width="500">
<img src="images\docs\upload-meter-conf\choose-meter.png" width="500">
<img src="images\docs\upload-meter-conf\config-not-found.png" width="500">

<p align="right">(<a href="#muc500editor">back to top</a>)</p>


<!-- GENERATE DEVICE HANDLE -->
### Generate Device Handle

<img src="images\docs\generate-device-handle.png" width="500">
<img src="images\docs\save-device-handle.png" width="500">
<img src="images\docs\saved-device-handle.png" width="150">



<!-- METER CONF FORMAT -->
### Meter Conf Format
The format looks like this
<img src="images\docs\meter-conf-format.png" width="500">

<p align="right">(<a href="#muc500editor">back to top</a>)</p>
