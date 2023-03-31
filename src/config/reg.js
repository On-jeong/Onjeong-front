const ID_REG = /^[A-Za-z]{1}[A-Za-z0-9]{5,19}$/; //영문자 또는 숫자 6 ~ 20자 - 영문자로 시작해야 함
const EMAIL_REG = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; // 계정@도메인.최상위도메인 형식
const PW_REG = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/; // 영문, 숫자 조합 8 ~ 16자
const NAME_REG = /[ㄱ-힣]/; // 한글만

export const reg = {
  ID_REG,
  EMAIL_REG,
  PW_REG,
  NAME_REG,
};
