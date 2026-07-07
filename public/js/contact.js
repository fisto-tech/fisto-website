  const text = "3D Animation, AR/VR Experiences & Customized App Solutions Across India";
    const target = document.getElementById("typingText");
    let index = 0;

    function typeText() {
      if (index < text.length) {
        target.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, 100);
      } else {
        target.classList.add("remove-cursor");
      }
    }

    window.addEventListener("load", typeText);

     document.addEventListener('DOMContentLoaded', function () {
      var input = document.querySelector("#mobileInput");
      var iti = window.intlTelInput(input, {
        separateDialCode: true,
        initialCountry: "in"
      });

      document.querySelector('#contactForm').addEventListener('submit', function (e) {
        var countryData = iti.getSelectedCountryData();
        var dialCode = countryData.dialCode;
        var countryName = countryData.name;
        var countryISO = countryData.iso2;
        var localNumber = input.value.trim().replace(/^0+/, '');
        var fullNumber = "+" + dialCode + localNumber;

        document.getElementById('fullMobileInput').value = fullNumber;
        document.getElementById('countryCodeInput').value = "+" + dialCode;
        document.getElementById('countryNameInput').value = countryName;
        document.getElementById('countryISOInput').value = countryISO;

        var typeOfEnquiry = document.getElementById('enquiryType').value;
        if (typeOfEnquiry === "others") {
          var othersField = document.getElementById('others');
          if (othersField.value.trim() === "") {
            e.preventDefault();
            alert("Please specify your enquiry type in the 'If others specify here' field.");
            return false;
          }
        }
      });

      function floatMobileLabel() {
        var mobileInput = document.querySelector("#mobileInput");
        var mobileLabel = document.querySelector(".mobile-label");
        function updateLabel() {
          if (mobileInput === document.activeElement || mobileInput.value.trim() !== "") {
            mobileLabel.style.top = "-5px";
            mobileLabel.style.left = "98px";
            mobileLabel.style.fontSize = "0.89rem";
            mobileLabel.style.color = "#ffffff";
            mobileLabel.style.background = "#000000";
            mobileLabel.style.padding = "0 9px";
            mobileLabel.style.fontWeight = "700";
            mobileLabel.style.borderRadius = "3px";
          } else {
            mobileLabel.style.top = "20px";
            mobileLabel.style.left = "105px";
            mobileLabel.style.fontSize = "1rem";
            mobileLabel.style.color = "#888e9d";
            mobileLabel.style.background = "transparent";
            mobileLabel.style.padding = "0 6px";
            mobileLabel.style.fontWeight = "500";
          }
        }
        mobileInput.addEventListener("focus", updateLabel);
        mobileInput.addEventListener("blur", updateLabel);
        mobileInput.addEventListener("input", updateLabel);
        window.addEventListener("resize", updateLabel);
        updateLabel();
      }
      floatMobileLabel();

    });

    window.addEventListener('DOMContentLoaded', function () {
      var fields = document.querySelectorAll('.right-panel .form-group');
      var img = document.querySelector('.feature-image');
      var h1 = document.querySelector('.left-panel h1');
      var p = document.querySelector('.left-panel p');
      var submit = document.querySelector('.submit-btn');
      img.style.opacity = h1.style.opacity = p.style.opacity = submit.style.opacity = 0;
      fields.forEach(f => f.style.opacity = 0);
      setTimeout(() => {
        img.style.transition = 'opacity .6s'; img.style.opacity = 1;
        setTimeout(() => { h1.style.transition = '.6s'; h1.style.opacity = 1; }, 150);
        setTimeout(() => { p.style.transition = '.5s'; p.style.opacity = 1; }, 380);
        fields.forEach((f, i) => { setTimeout(() => { f.style.transition = '.4s'; f.style.opacity = 1; }, 500 + 70 * i); });
        setTimeout(() => { submit.style.transition = '.5s'; submit.style.opacity = 1; }, 950);
      }, 150);
    });

    const othersInput = document.getElementById('enquiryType');
    const othersField = document.getElementById('others');

    othersInput.addEventListener('change', function () {
      if (this.value === "others") {
        othersField.disabled = false;
        othersField.required = true;
        othersField.classList.add("active-border");
        othersField.classList.remove("inactive-border");
      } else {
        othersField.disabled = true;
        othersField.required = false;
        othersField.value = '';
        othersField.classList.remove("active-border");
        othersField.classList.add("inactive-border");
      }
    });
