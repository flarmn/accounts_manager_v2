

/**
 * @param {string} login
 * @returns {{ isValid: boolean, errorText: string }}
 */
export function validateLogin(login) {
  if (typeof login !== 'string' || login.trim() === '') {
    return { isValid: false, errorText: 'Логин не может быть пустым' };
  }
  if (login.length > 100) {
    return { isValid: false, errorText: 'Логин не может быть длиннее 100 символов' };
  }
  return { isValid: true, errorText: '' };
}

/**
 * @param {string} password
 * @returns {{ isValid: boolean, errorText: string }}
 */
export function validatePassword(password) {
  if (typeof password !== 'string' || password.trim() === '') {
    return { isValid: false, errorText: 'Пароль не может быть пустым' };
  }
  if (password.length < 8) {
    return { isValid: false, errorText: 'Пароль должен быть не меньше 8 символов' };
  }
  if (password.length > 100) {
    return { isValid: false, errorText: 'Пароль не может быть длиннее 100 символов' };
  }
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!pattern.test(password)) {
    return {
      isValid: false,
      errorText: 'Пароль должен содержать минимум 8 символов, включая буквы и цифры'
    };
  }
  return { isValid: true, errorText: '' };
}
