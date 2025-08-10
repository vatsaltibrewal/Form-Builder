# Dynamic Form Builder

This project is a comprehensive, feature-rich dynamic form builder. The application is built from the ground up using a modern front-end stack and is heavily inspired by the clean and intuitive user experience of Google Forms.

**➡️ Live Demo Link - https://form-builder-beige-xi.vercel.app** 

---

## ✨ Core Features

This application successfully implements all the requirements outlined in the assignment document:

-   **[x] Form Creation & Management:**
    -   **Dynamic Form Builder:** A clean interface on the `/create` route to visually construct forms.
    -   **Google Forms Inspired UI:** A central canvas for fields and a floating palette for adding new elements.
    -   **Rich Field Types:** Supports a variety of fields, each with a distinct purpose:
        -   **Header:** For titles and descriptive text (non-input).
        -   **Short Text & Paragraph:** For single-line and multi-line text input.
        -   **Number:** For numerical input.
        -   **Multiple Choice (Radio):** For single-selection answers.
        -   **Checkboxes:** For multiple-selection answers.
        -   **Dropdown (Select):** For single-selection from a dropdown list.
        -   **Date:** A dedicated date picker with a calendar interface.

-   **[x] Advanced Field Configuration:**
    -   **Click-to-Edit:** An intuitive system where clicking a field makes it editable.
    -   **Drag & Drop Reordering:** Smoothly reorder fields using the modern and accessible `@dnd-kit` library.
    -   **Custom Validation:** Configure fields with rules like:
        -   Required toggle (`Not empty`).
        -   Input format validation (Email, Phone Number, Plain Text).
        -   Min/Max length for text and value for numbers.
    -   **Options Editor:** Easily add, edit, and remove choices for Radio, Checkbox, and Select fields.

-   **[x] Derived Fields:**
    -   The ability to mark a field's value as computationally derived from another.
    -   **Implemented Example:** `Age` field automatically calculated from a `Date of Birth` field, updating in real-time.

-   **[x] Persistence and Preview:**
    -   **Local Storage:** All form schemas are saved directly to the browser's `localStorage`, requiring no backend.
    -   **Form Listing:** The `/myforms` page fetches and displays a list of all saved forms, showing their name and creation date.
    -   **Interactive Preview:** The `/preview` routes render a fully interactive form based on a schema. User input is validated in real-time using `react-hook-form`.

---

## 🛠️ Tech Stack

This project leverages a modern, type-safe, and efficient technology stack, chosen to meet the assignment requirements and industry best practices.

-   **Framework:** **Next.js 14** (with App Router)
-   **Language:** **TypeScript**
-   **UI Library:** **Material-UI (MUI)** for a comprehensive set of pre-styled components.
-   **State Management:** **Redux Toolkit** for predictable and centralized application state.
-   **Form Handling:** **React Hook Form** for performant and powerful form state management and validation.
-   **Drag & Drop:** **`@dnd-kit`** as a modern, accessible, and high-performance library for reordering fields.
-   **Date Management:** **`date-fns`** and **`@mui/x-date-pickers`** for date calculations and a rich calendar UI.
-   **Deployment:** **Vercel**

---

## 📂 Project Structure

The codebase is organized into a modular and scalable structure to ensure clean and maintainable code.

```
/src
├── app/              # Next.js App Router: all pages, layouts, and API routes.
│   ├── create/
│   ├── myforms/
│   └── preview/
├── components/       # Reusable React components (FieldEditor, Palette, etc.).
│   └── fieldSettings/ # Components specific to configuring different field types.
├── lib/              # Core application logic and setup.
│   ├── hooks/        # Custom React hooks (e.g., for derived fields).
│   ├── slices/       # Redux Toolkit state slices.
│   └── store.ts      # Redux store configuration.
├── types/            # TypeScript type definitions (form.d.ts).
└── theme.ts          # MUI theme configuration (Dark Mode is default).
```

---

## 🚀 Getting Started

To run this project locally, follow these simple steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/vatsaltibrewal/Form-Builder.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd your-Form-Builder
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## License

This project is licensed under the MIT Public License - see the [LICENSE](LICENSE) file for details.
