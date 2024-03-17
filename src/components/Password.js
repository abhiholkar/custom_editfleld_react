import React, { useRef, useEffect, useState, useContext } from 'react';
import { PasswordContext } from '../App';
import { passwordPlaceHolderText } from './Constants.js';

let passwordString = '';

const Password = ({ maxLength }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [placeholder, setPlaceholder] = useState(passwordPlaceHolderText);
  const passwordLength = maxLength;
  const { userpassword, setUserPassword } = useContext(PasswordContext);
  const contentRef = useRef();
  const caretPos = useRef();



  useEffect(() => {
    setCaret(contentRef.current, caretPos.current);
    contentRef.current.focus();
  }, [userpassword]);

  function getCaret(el) {
    let caretAt = 0;
    const sel = window.getSelection();

    if (sel.rangeCount === 0) { return caretAt };

    const range = sel.getRangeAt(0);
    const preRange = range.cloneRange();
    preRange.selectNodeContents(el);
    preRange.setEnd(range.endContainer, range.endOffset);
    caretAt = preRange.toString().length;

    return caretAt;
  }


  function setCaret(el, offset) {
    let sel = window.getSelection();
    let range = document.createRange();

    if (el.childNodes[0] instanceof Node) {

      range.setStart(el.childNodes[0], offset);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);

    }

  }

  const handleChange = (event) => {
    const newText = event.target.textContent;

    if (newText.length <= maxLength) {
      setUserPassword(passwordString);
      caretPos.current = getCaret(contentRef.current);
    } else {
      event.preventDefault();
    }
    if(passwordString!== undefined && passwordString.trim().length>0 )
    setPlaceholder('Type Password Here');
  };

  const handleKeyPress = (event) => {
    console.log("Keycode = " + event.keyCode);
    if (event.keyCode === 13 || (passwordLength <= event.target.textContent.length)) {
      event.preventDefault();
      return;
    }

    //Handle backspace key
    if (event.keyCode === 8 ) {
      // TODO
    }

    //handle alphanumeric keys only
    if ((event.keyCode < 47) || (event.keycode > 90)) {
      event.preventDefault();
    } else {
      passwordString += event.key;
      console.log("passwordString : " + passwordString);

    }

  };

  const handleFocus = () => {
    if (!userpassword) {
      setPlaceholder('');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const maskPassword = () => {
    return showPassword ? passwordString : '*'.repeat(userpassword.length);

  };

  return (
    <div className="form-field">
      <label htmlFor="password">Password:</label>
      <div className="password-container">
        <div
          id="password"
          className="custom-input"
          contentEditable
          suppressContentEditableWarning={true}
          ref={contentRef}
          onInput={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
        >
          {maskPassword() || placeholder}
        </div>
        <button onClick={toggleShowPassword}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
};

export default Password;
