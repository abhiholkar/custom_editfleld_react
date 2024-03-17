import React, { useRef, useEffect,useState,useContext } from 'react';
import { UserNameContext } from "../App.js"
import { usernamePlaceHolderText } from './Constants.js';



const Username = ({maxLength}) => {
  // Placeholder Text
  const [placeholder, setPlaceholder] = useState(usernamePlaceHolderText);
  //Max length based on props
  const usernameLength = maxLength;
  // Username context & ref
  const {currentUser,setCurrentUser} = useContext(UserNameContext);
  const contentRef = useRef();
  const caretPos = useRef();

  useEffect(() => {
    setCaret(contentRef.current, caretPos.current);
    contentRef.current.focus();
  }, [currentUser]);

  function getCaret(el) {
    let caretAt = 0;
    const sel = window.getSelection();
    
    if ( sel.rangeCount === 0 ) { return caretAt}; 
  
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
    
    if(el.childNodes[0] instanceof Node) {

      range.setStart(el.childNodes[0], offset);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);  

    }
   
  }

  const handleChange = (event) => {
    const newText = event.target.textContent;
    if (newText.length <= usernameLength) {
      setCurrentUser(newText);
      caretPos.current = getCaret(contentRef.current);     
    
    } else {
      event.preventDefault();
    }
    const placeholderText = ( currentUser || currentUser.length ===0) ? '' : usernamePlaceHolderText;
    setPlaceholder(placeholderText);  
  };

  const handleFocus = () => {
    if (!currentUser) {
      setPlaceholder('');
    }
  };

  const handleBlur = () => {
    if (!currentUser) {
      setPlaceholder(placeholder);
    }

  };
  const handleKeyPress = (event) => {
    //usernameLength     {
      if (event.keyCode === 13 || (usernameLength <= event.target.textContent.length) ) {
      event.preventDefault();
    }
  };

  return (
    <div className="form-field">
      <label>Username:</label>
      <div
        id="username"
        className="custom-input"
        contentEditable
        autoFocus
        suppressContentEditableWarning={true}
        ref={contentRef}
        onInput={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyPress}
        placeholder={usernamePlaceHolderText}
      >
        {currentUser===null  ? currentUser : placeholder}
      </div>
    </div>
  );
};


export default Username;
