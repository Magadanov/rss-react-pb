import { cn } from '@app/utils/cn';
import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './Input.module.scss';
import hiddenImg from '@app/assets/hidden.svg';
import visibleImg from '@app/assets/visible.svg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  options?: string[] | null;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', options, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dropdownRef = useRef<HTMLUListElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (options) {
        setFilteredOptions(
          options.filter((option) =>
            option.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
      }
    };

    const handleSelectOption = (option: string) => {
      if (!inputRef.current) return;
      inputRef.current.value = option;
      setFilteredOptions([]);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current !== e.target
      ) {
        setFilteredOptions([]);
      }
    };

    useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);

    return (
      <div className={cn(styles.wrapper, className)}>
        {label && <label className={styles.label}>{label}</label>}
        <input
          ref={(el) => {
            inputRef.current = el;
            if (typeof ref === 'function') ref(el);
            else if (ref) ref.current = el;
          }}
          type={type === 'password' ? (isVisible ? 'text' : 'password') : type}
          className={cn(styles.input, error ? styles.error : '')}
          onChange={handleInputChange}
          {...rest}
        />
        {filteredOptions.length > 0 && (
          <ul ref={dropdownRef} className={styles.dropdown}>
            {filteredOptions.map((option) => (
              <li key={option} onClick={() => handleSelectOption(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
        {type === 'password' && (
          <img
            className={cn(
              styles.visible__img,
              label && styles.visible__label_img
            )}
            src={isVisible ? hiddenImg : visibleImg}
            alt="visible"
            onClick={() => setIsVisible(!isVisible)}
          />
        )}
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
