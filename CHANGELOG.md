# Change Log

#### [Current]

**Implemented enhancements:**
 * [b83da6b](../../commit/b83da6b) - __(Imad El HItti)__ Change project folder structure and remove useless imports
 * [8f30c9e](../../commit/8f30c9e) - __(Imad El HItti)__ Adding pages stats and total pages
 * [e12bc21](../../commit/e12bc21) - __(Imad El HItti)__ Changelog and Readme updated
 * [8236c14](../../commit/8236c14) - __(Imad El HItti)__ Factorize entities form components and modify rest button utility
    - Reset button will now reset form to empty value if we are in add mode, or it will reset to the original value of the edited entity if we are in edit mode
 * [c64473e](../../commit/c64473e) - __(Imad El HItti)__ Change table to material design layout in form components
 * [8c6bae1](../../commit/8c6bae1) - __(Imad El HItti)__ README.md updated
 * [531c605](../../commit/531c605) - __(Imad El HItti)__ CHANGLOG.md updated
 * [03fa9bf](../../commit/03fa9bf) - __(Imad El HItti)__ Code refactoring and improvements
    - Creating a generic service to remove code redundancy in each entity service
    - Remove useless components (manage components) in each entity and implementing it directly to list component
    - Remove useless service (transferData), to get data of edited entity directly for an API call
    - Centralized notification system in a Service
    - Implementing pagination system in list component
    - Added underscore library
    - Code refactoring

**Fixed bugs:**

 * [4937d5f](../../commit/4937d5f) - __(Imad El HItti)__ Fix after adding an entity event
    - After adding an entity, the form will be loaded into edit mode with this new entity values. So we will be able to directly edit the added entity
 * [73c02df](../../commit/73c02df) - __(Imad El HItti)__ Fix entities form and replaced Car input to select in Driver Form
    - In driver form, the car list will be fetched from an API call and the user will be able to select an available car instead of entering the id manually
 * [bd3827e](../../commit/bd3827e) - __(Imad El HItti)__ Fix entities model based on serve api model
 * [ff26226](../../commit/ff26226) - __(Imad El HItti)__ Fix some CSS
    - Remove /deep/ css  for placeholder in components css file and put it in main style.css
    - Fixed blur placeholder when focus on an input
    - Use pointer cursor on hover table rows
 * [360ebf7](../../commit/360ebf7) - __(Imad El HItti)__ Fix entity list and form components title


## [0.1.0](https://github.com/so-technology-watch/angular2-demo/tree/0.1.0) (2017-05-30)

**Implemented enhancements:**

 * [a881435](../../commit/a881435) - __(Imad El HItti)__ Application version 0.1.0
 * [de03d48](../../commit/de03d48) - __(Imad El HItti)__ Update README.md
 * [e6a85c4](../../commit/e6a85c4) - __(Imad El HItti)__ README.md updated
 * [7cc24c6](../../commit/7cc24c6) - __(Imad El HItti)__ README.md updated
 * [8dc2f7a](../../commit/8dc2f7a) - __(Imad El HItti)__ README.md updated
 * [47423b2](../../commit/47423b2) - __(Imad El HItti)__ Implementing centralized notification and some service fixes
 * [8e0e284](../../commit/8e0e284) - __(Imad El HItti)__ update readme.md
 * [0a4888a](../../commit/0a4888a) - __(Imad El HItti)__ Implementing driver form
 * [55c032f](../../commit/55c032f) - __(Imad El HItti)__ Implementing Car form, add and edit
 * [64a53c2](../../commit/64a53c2) - __(Imad El HItti)__ modify layout css and updated readme
 * [7d0705d](../../commit/7d0705d) - __(Imad EL HITTI)__ First time load

**Fixed bugs:**

* [9ac1a01](../../commit/9ac1a01) - __(Imad El HItti)__ Fix some issues and beautify code
    - Fix Go Home button in not-found page
    - Changes functions to lambda (arrow) functions
    - Fix notification issues if a problem occure on server side
    - Delete useless service (routeurDataLink)
    - Fix css main style
    - Commenting code