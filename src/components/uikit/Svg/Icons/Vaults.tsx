
import React from "react";
import { SvgProps, rotation } from "./types";

const Vault: React.FC<SvgProps> = ({ direction = "right", color = "text", width, getStyles }) => {
  const deg: rotation = {
    left: 180,
    up: 270,
    right: 0,
    down: 90,
  };
  const style = getStyles({
    degree: deg[direction as keyof rotation],
    color,
  });

  return (
    <svg width={width || "24"} viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg" sx={style}>
      <g clipPath="url(#clip0_3820_8010)">
        <path
          d="M6.42081 8.55251H3.67029C2.99749 8.5524 2.34312 8.76397 1.80698 9.15495C1.27084 9.54593 0.882352 10.0949 0.700773 10.718C0.315349 9.0328 0.963562 5.95727 3.32866 4.55853C3.32866 4.55853 2.50526 7.57508 2.96076 8.33343C2.96076 8.33343 6.29818 7.81101 5.15067 0C5.16819 0 8.51437 2.56997 6.42081 8.55251ZM9.38157 8.55251H7.94499C8.02598 7.98115 8.23176 7.43274 8.54881 6.94333C8.86585 6.45392 9.28698 6.03459 9.78451 5.71291C9.42682 6.6175 9.28899 7.58881 9.38157 8.55251V8.55251ZM16.3367 3.80861L15.5659 8.55251H12.8153L16.3367 3.80861V3.80861ZM20.2348 8.6115C20.0362 8.57022 19.8335 8.55044 19.6303 8.55251H17.4229C17.7537 7.63575 17.9569 6.68094 18.0273 5.71291C18.1377 4.11681 17.9296 2.51513 17.4142 0.994282C17.5193 1.04484 20.9093 2.82275 20.2348 8.6115V8.6115ZM19.9019 10.3978C19.8116 10.3891 19.7206 10.3891 19.6303 10.3978H3.67029C3.51426 10.3967 3.35954 10.4253 3.21506 10.482C3.07057 10.5387 2.93917 10.6223 2.82843 10.728C2.71769 10.8338 2.6298 10.9595 2.56983 11.0981C2.50985 11.2367 2.47897 11.3853 2.47898 11.5354V13.4818H1.0424C0.884387 13.4804 0.728276 13.515 0.586898 13.5829C0.418104 13.6626 0.274616 13.7843 0.17139 13.9355C0.0681641 14.0867 0.00897849 14.2617 2.44868e-06 14.4424V17.1303C0.00108071 17.3182 0.0565655 17.5021 0.160232 17.6613C0.263899 17.8206 0.411646 17.9489 0.586898 18.0319C0.730236 18.0934 0.885469 18.1249 1.0424 18.1246H2.47898V20.2227H1.0424C0.884387 20.2213 0.728276 20.2559 0.586898 20.3238C0.40762 20.4064 0.256904 20.537 0.15281 20.6999C0.0487166 20.8628 -0.00433859 21.0511 2.44868e-06 21.2423V23.9386C-0.000366341 24.1257 0.0546243 24.3091 0.15855 24.4672C0.262475 24.6254 0.411044 24.7518 0.586898 24.8318C0.728276 24.8997 0.884387 24.9343 1.0424 24.9329H2.47898V26.8625C2.47897 27.0126 2.50985 27.1612 2.56983 27.2997C2.6298 27.4383 2.71769 27.5641 2.82843 27.6698C2.93917 27.7756 3.07057 27.8592 3.21506 27.9158C3.35954 27.9725 3.51426 28.0011 3.67029 28H19.6303C19.786 28.0011 19.9403 27.9725 20.0843 27.9157C20.2283 27.8589 20.3591 27.7752 20.4691 27.6693C20.5792 27.5635 20.6662 27.4376 20.7253 27.2991C20.7843 27.1606 20.8141 27.0122 20.8129 26.8625V11.5101C20.8125 11.2533 20.7225 11.0041 20.5574 10.8024C20.3922 10.6007 20.1613 10.4582 19.9019 10.3978V10.3978ZM7.37562 22.5314L6.4033 23.4667C6.33569 23.5325 6.2552 23.5847 6.16649 23.6203C6.07777 23.6559 5.9826 23.6742 5.88648 23.6742C5.79035 23.6742 5.69518 23.6559 5.60647 23.6203C5.51776 23.5847 5.43727 23.5325 5.36966 23.4667C5.23585 23.3333 5.16108 23.155 5.16108 22.9696C5.16108 22.7842 5.23585 22.606 5.36966 22.4725L6.34198 21.5372C6.48075 21.4084 6.66602 21.3365 6.8588 21.3365C7.05158 21.3365 7.23684 21.4084 7.37562 21.5372C7.44395 21.6022 7.49819 21.6796 7.53521 21.765C7.57223 21.8503 7.59129 21.9418 7.59129 22.0343C7.59129 22.1268 7.57223 22.2183 7.53521 22.3037C7.49819 22.389 7.44395 22.4664 7.37562 22.5314V22.5314ZM7.37562 16.9112C7.308 16.977 7.22752 17.0291 7.1388 17.0647C7.05009 17.1004 6.95492 17.1187 6.8588 17.1187C6.76267 17.1187 6.6675 17.1004 6.57879 17.0647C6.49008 17.0291 6.40959 16.977 6.34198 16.9112L5.36966 16.0096C5.26687 15.9118 5.19674 15.7867 5.16823 15.6504C5.13972 15.514 5.15413 15.3726 5.20961 15.2441C5.26509 15.1157 5.35912 15.0061 5.47969 14.9293C5.60026 14.8525 5.74189 14.8121 5.88648 14.8131C5.98229 14.812 6.07737 14.8293 6.16613 14.864C6.25489 14.8987 6.33553 14.9502 6.4033 15.0153L7.37562 15.9506C7.50313 16.0805 7.57418 16.2523 7.57418 16.4309C7.57418 16.6095 7.50313 16.7814 7.37562 16.9112V16.9112ZM10.8094 20.2227C10.6064 20.4192 10.3473 20.5533 10.065 20.608C9.78268 20.6627 9.48983 20.6356 9.22358 20.53C8.95733 20.4244 8.72968 20.2451 8.56949 20.0149C8.40929 19.7847 8.32377 19.5139 8.32377 19.2368C8.32377 18.9598 8.40929 18.689 8.56949 18.4588C8.72968 18.2286 8.95733 18.0493 9.22358 17.9437C9.48983 17.8381 9.78268 17.8109 10.065 17.8656C10.3473 17.9203 10.6064 18.0545 10.8094 18.251C10.9438 18.3804 11.0502 18.5341 11.1224 18.7034C11.1946 18.8726 11.2311 19.0539 11.2299 19.2368C11.2304 19.6059 11.0793 19.9603 10.8094 20.2227ZM14.1906 23.4752C14.1233 23.5415 14.0429 23.5942 13.9542 23.6304C13.8655 23.6666 13.7702 23.6854 13.6738 23.6858C13.4799 23.6814 13.2951 23.6061 13.157 23.4752L12.1847 22.5399C12.0476 22.408 11.9706 22.2292 11.9706 22.0427C11.9706 21.8563 12.0476 21.6774 12.1847 21.5456C12.3217 21.4137 12.5076 21.3397 12.7015 21.3397C12.8953 21.3397 13.0812 21.4137 13.2183 21.5456L14.1906 22.4809C14.3259 22.6119 14.4019 22.7891 14.4019 22.9738C14.4019 23.1585 14.3259 23.3357 14.1906 23.4667V23.4752ZM14.1906 15.9844L13.2183 16.9197C13.1507 16.9854 13.0702 17.0376 12.9815 17.0732C12.8928 17.1088 12.7976 17.1271 12.7015 17.1271C12.6053 17.1271 12.5102 17.1088 12.4215 17.0732C12.3328 17.0376 12.2523 16.9854 12.1847 16.9197C12.0508 16.7862 11.9761 16.6079 11.9761 16.4225C11.9761 16.2371 12.0508 16.0589 12.1847 15.9254L13.1395 14.9816C13.2782 14.8529 13.4635 14.781 13.6563 14.781C13.8491 14.781 14.0343 14.8529 14.1731 14.9816C14.3092 15.1145 14.3875 15.2923 14.3921 15.4788C14.3987 15.5759 14.3843 15.6732 14.3496 15.7647C14.3149 15.8561 14.2607 15.9395 14.1906 16.0096V15.9844ZM18.185 22.3208C18.1827 22.4892 18.1115 22.6499 17.9869 22.7682C17.8623 22.8865 17.6943 22.9528 17.5193 22.9528H17.3791C17.2056 22.9506 17.0398 22.8833 16.9171 22.7652C16.7944 22.6472 16.7244 22.4877 16.7221 22.3208V16.5068C16.7244 16.3398 16.7944 16.1804 16.9171 16.0623C17.0398 15.9443 17.2056 15.877 17.3791 15.8748H17.5193C17.6943 15.8748 17.8623 15.9411 17.9869 16.0594C18.1115 16.1777 18.1827 16.3384 18.185 16.5068V22.3208ZM24.527 22.6073C24.1442 23.5763 23.5463 24.4533 22.7751 25.1773V11.5101C22.7763 11.0407 22.6591 10.5781 22.4334 10.1619C22.885 9.59743 23.4513 9.12727 24.0978 8.78002C23.4599 10.6234 23.4599 12.6159 24.0978 14.4592C25.1926 17.0508 25.3439 19.9225 24.527 22.6073V22.6073Z"
          fill="#4D4040"
        />
      </g>
      <defs>
        <clipPath id="clip0_3820_8010">
          <rect width="25" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Vault;
