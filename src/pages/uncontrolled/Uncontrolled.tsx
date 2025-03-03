import { Button } from '@app/ui/button/Button';
import { GridLayout } from '@app/ui/grid/Grid';
import { Input } from '@app/ui/input/Input';
import styles from './Uncontrolled.module.scss';
import { ChangeEvent, FormEvent, useId, useRef, useState } from 'react';
import { formControl } from '@app/utils/formControl';
import { zodSchemaUncontrolled } from '@app/utils/zod';
import { useAppDispatch, useAppSelector } from '@app/store';
import { fileToBase64 } from '@app/utils/fileToBase64';
import { addData } from '@app/store/reducer/form';
import { FormData } from '@app/types/form.type';
import { useNavigate } from 'react-router';

export default function Uncontrolled() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const countries = useAppSelector((state) => state.form.countries);
  const uid = useId();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!formRef.current) return;

    const { formValues, formErrors } = formControl(
      formRef.current,
      zodSchemaUncontrolled
    );
    setErrors(formErrors);
    if (!Object.keys(formErrors).length) {
      const { picture } = formValues;
      const pictureBase64 = await fileToBase64(picture as File);
      const resultForm = {
        ...formValues,
        picture: `data:image/png;base64,${pictureBase64}`,
        id: uid,
      };
      dispatch(addData(resultForm as unknown as FormData));
      navigate('/');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
    if (!formRef.current || !isSubmitted) return;
    const key = e.target.name;
    const { formErrors } = formControl(formRef.current, zodSchemaUncontrolled);
    if (errors[key] !== formErrors[key]) {
      setErrors(formErrors);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} onChange={handleChange}>
      <GridLayout>
        <Input label="Name" name="name" error={errors.name} />
        <Input type="number" label="Age" name="age" error={errors.age} />
        <Input label="Email" name="email" error={errors.email} />
        <div>
          <label>Gender:</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="M"
                defaultChecked={true}
              />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="F" /> Female
            </label>
          </div>
        </div>
        <Input
          type="password"
          label="Password"
          name="password"
          error={errors.password}
        />
        <Input
          type="password"
          label="Confirm password"
          name="confirmPassword"
          error={errors.confirmPassword}
        />
        <Input
          label="Picture"
          name="picture"
          type="file"
          accept="image/png, image/jpeg"
          error={errors.picture}
        />
        <Input
          label="Country"
          name="country"
          error={errors.country}
          options={countries}
        />
      </GridLayout>
      <div className={styles.agreement}>
        <input type="checkbox" name="isAgreed" id="isAgreed" />
        <span>Agree with condition</span>
        {errors.isAgreed && <span className={styles.required}>*</span>}
      </div>
      <Button
        type="submit"
        title="Submit"
        className={styles.submit}
        disabled={Object.keys(errors).length > 0}
      />
    </form>
  );
}
