"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAvatar, selectIsInventoryLoaded, selectLanguage, setAvatar } from "@/store/slices/appSlice";
import Loading from "@/components/Loading";
import { getDictionary } from "@/helpers";
import { loginRequest } from "@/services/inventoryApi";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  position: string;
};

type FormErrors = Partial<Record<keyof FormValues | "avatar", string>>;

const defaultValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  position: "",
};

const STORAGE_KEY = "settings-profile";
const MAX_FILE_SIZE = 12 * 9024 * 9024; // 12 MB
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector(selectAvatar);
  const isInventoryLoaded = useAppSelector(selectIsInventoryLoaded);
  const language = useAppSelector(selectLanguage);
  const dictionary = getDictionary(language);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem(STORAGE_KEY);

    if (!savedProfile) {
      return;
    }

    try {
      const parsedProfile = JSON.parse(savedProfile) as FormValues;
      setValues({
        name: parsedProfile.name ?? "",
        email: parsedProfile.email ?? "",
        phone: parsedProfile.phone ?? "",
        position: parsedProfile.position ?? "",
      });
    } catch (error) {
      console.error("Failed to parse saved profile", error);
    }
  }, []);

  const validateForm = () => {
    const nextErrors: FormErrors = {};
    const trimmedName = values.name.trim();
    const trimmedEmail = values.email.trim();
    const trimmedPhone = values.phone.trim();
    const trimmedPosition = values.position.trim();

    if (trimmedName.length < 2) {
      nextErrors.name = dictionary.settings.nameTooShort;
    } else if (!/^[a-zA-Zа-яА-ЯёЁ]+$/.test(trimmedName)) {
      nextErrors.name = dictionary.settings.nameInvalid;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = dictionary.settings.emailInvalid;
    }

    if (!/^\+?[0-9\s()-]{10,18}$/.test(trimmedPhone)) {
      nextErrors.phone = dictionary.settings.phoneInvalid;
    }

    if (trimmedPosition.length < 2) {
      nextErrors.position = dictionary.settings.positionInvalid;
    }

    return nextErrors;
  };

  const profilePreview = useMemo(() => {
    return {
      name: values.name.trim() || dictionary.settings.profileNameEmpty,
      email: values.email.trim() || dictionary.settings.profileEmailEmpty,
      position: values.position.trim() || dictionary.settings.profileRoleEmpty,
    };
  }, [
    dictionary.settings.profileEmailEmpty,
    dictionary.settings.profileNameEmpty,
    dictionary.settings.profileRoleEmpty,
    values,
  ]);

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }));
    }

    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (!file) {
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        avatar: dictionary.settings.avatarTypeError,
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        avatar: dictionary.settings.avatarSizeError,
      }));
      return;
    }

    setErrors((currentErrors) => ({
      ...currentErrors,
      avatar: undefined,
    }));

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch("http://localhost:4000/api/upload/avatar", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Avatar upload failed");
      }

      const data = await response.json();

      dispatch(setAvatar(data.imageUrl));
      localStorage.setItem("avatar", data.imageUrl);
      setSuccessMessage(dictionary.settings.avatarUpdated);
    } catch (error) {
      console.error("Failed to upload avatar", error);
      setErrors((currentErrors) => ({
        ...currentErrors,
        avatar: dictionary.settings.avatarUploadError,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccessMessage("");
      return;
    }

    setErrors({});
    setIsSaving(true);

    const sanitizedValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      position: values.position.trim(),
    };

    try {
      const response = await loginRequest({
        name: values.name.trim(),
        email: values.email.trim(),
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizedValues));
      setSuccessMessage(dictionary.settings.saveSuccess);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsSaving(false);
    }

    window.setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage(dictionary.settings.saveSuccess);
    }, 500);
  };

  if (!isInventoryLoaded) {
    return <Loading />;
  }

  return (
    <section className={styles.page}>
      <div className={styles.toolbarTitle}>
        <h1 className={styles.title}>{dictionary.settings.pageTitle}</h1>
      </div>

      <div className={styles.layout}>
        <aside className={styles.profileCard}>
          <div className={styles.avatarWrap}>
            <Image alt="avatar" className={styles.avatar} height={112} src={avatar} unoptimized width={112} />
            <button className={styles.avatarButton} onClick={handleOpenFilePicker} type="button">
              {dictionary.settings.updatePhoto}
            </button>
            <input
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp"
              className={styles.hiddenInput}
              onChange={handleAvatarChange}
              type="file"
            />
          </div>

          {errors.avatar ? <p className={styles.errorText}>{errors.avatar}</p> : null}

          <div className={styles.profileMeta}>
            <span className={styles.profileLabel}>{dictionary.settings.user}</span>
            <strong className={styles.profileName}>{profilePreview.name}</strong>
            <span className={styles.profileRole}>{profilePreview.position}</span>
          </div>

          <div className={styles.profileInfoList}>
            <div className={styles.profileInfoItem}>
              <span>{dictionary.settings.email}</span>
              <strong>{profilePreview.email}</strong>
            </div>
            <div className={styles.profileInfoItem}>
              <span>{dictionary.settings.storage}</span>
              <strong>{dictionary.settings.localStorage}</strong>
            </div>
          </div>
        </aside>

        <form className={styles.formCard} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <div>
              <p className={styles.formLabel}>{dictionary.settings.formLabel}</p>
              <h2 className={styles.formTitle}>{dictionary.settings.formTitle}</h2>
            </div>
          </div>

          <div className={styles.fieldsGrid}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>{dictionary.settings.name}</span>
              <input
                className={errors.name ? `${styles.input} ${styles.inputError}` : styles.input}
                onChange={(event) => handleChange("name", event.target.value)}
                placeholder={dictionary.settings.namePlaceholder}
                type="text"
                value={values.name}
              />
              {errors.name ? <span className={styles.errorText}>{errors.name}</span> : null}
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>{dictionary.settings.email}</span>
              <input
                className={errors.email ? `${styles.input} ${styles.inputError}` : styles.input}
                onChange={(event) => handleChange("email", event.target.value)}
                placeholder={dictionary.settings.emailPlaceholder}
                type="email"
                value={values.email}
              />
              {errors.email ? <span className={styles.errorText}>{errors.email}</span> : null}
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>{dictionary.settings.phone}</span>
              <input
                className={errors.phone ? `${styles.input} ${styles.inputError}` : styles.input}
                onChange={(event) => handleChange("phone", event.target.value)}
                placeholder={dictionary.settings.phonePlaceholder}
                type="tel"
                value={values.phone}
              />
              {errors.phone ? <span className={styles.errorText}>{errors.phone}</span> : null}
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>{dictionary.settings.position}</span>
              <input
                className={errors.position ? `${styles.input} ${styles.inputError}` : styles.input}
                onChange={(event) => handleChange("position", event.target.value)}
                placeholder={dictionary.settings.positionPlaceholder}
                type="text"
                value={values.position}
              />
              {errors.position ? <span className={styles.errorText}>{errors.position}</span> : null}
            </label>
          </div>

          <div className={styles.footer}>
            <div>{successMessage ? <p className={styles.successText}>{successMessage}</p> : null}</div>
            <button className={styles.submitButton} disabled={isSaving} type="submit">
              {isSaving ? dictionary.settings.saving : dictionary.settings.save}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SettingsPage;
