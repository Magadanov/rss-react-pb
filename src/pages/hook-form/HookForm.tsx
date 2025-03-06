import { countries } from '@app/data/countries';
import { FormData } from '@app/types/form.type';
import { GridLayout } from '@app/ui/grid/Grid';
import { Input } from '@app/ui/input/Input';
import { zodSchemaHook } from '@app/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import styles from './HookForm.module.scss';
import { Button } from '@app/ui/button/Button';
import { fileToBase64 } from '@app/utils/fileToBase64';
import { addData } from '@app/store/reducer/form';
import { useId } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@app/store';

type FormDataType = Omit<FormData, 'id' | 'isNew'>;

export default function HookForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormDataType>({
    resolver: zodResolver(zodSchemaHook),
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const uid = useId();

  const onSubmit = async (data: FormDataType) => {
    const { picture } = data;
    const pictureBase64 = await fileToBase64(picture as File);
    const resultForm = {
      ...data,
      picture: `data:image/png;base64,${pictureBase64}`,
      id: uid,
    };
    dispatch(addData(resultForm as unknown as FormData));
    navigate('/');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GridLayout>
        <Input
          label="Name"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="Age"
          {...register('age', { valueAsNumber: true })}
          error={errors.age?.message}
        />
        <Input
          label="Email"
          {...register('email')}
          error={errors.email?.message}
        />
        <div>
          <label>Gender:</label>
          <div>
            <label>
              <input
                type="radio"
                {...register('gender')}
                value="M"
                defaultChecked={true}
              />
              Male
            </label>
            <label>
              <input type="radio" {...register('gender')} value="F" /> Female
            </label>
          </div>
        </div>
        <Input
          type="password"
          label="Password"
          {...register('password')}
          error={errors.password?.message}
        />
        <Input
          type="password"
          label="Confirm password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        <Input
          label="Picture"
          type="file"
          accept="image/png, image/jpeg"
          error={errors.picture?.message}
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setValue('picture', file as File);
          }}
        />
        <Input
          label="Country"
          options={countries}
          {...register('country')}
          error={errors.country?.message}
        />
      </GridLayout>
      <div className={styles.agreement}>
        <input type="checkbox" {...register('isAgreed')} id="isAgreed" />
        <span>Agree with condition</span>
        {errors.isAgreed && <span className={styles.required}>*</span>}
      </div>
      <Button
        type="submit"
        title="Submit"
        className={styles.submit}
        disabled={!isValid}
      />
    </form>
  );
}
