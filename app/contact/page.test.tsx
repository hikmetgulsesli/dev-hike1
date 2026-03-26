import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactPage from './page';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('ContactPage', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('Form Validation', () => {
    it('shows error when firstName is empty on blur', async () => {
      render(<ContactPage />);
      
      const firstNameInput = screen.getByLabelText(/FIRST_NAME/i);
      fireEvent.change(firstNameInput, { target: { value: '' } });
      fireEvent.blur(firstNameInput);
      
      await waitFor(() => {
        expect(screen.getByText('Ad zorunludur')).toBeInTheDocument();
      });
    });

    it('shows error when firstName is too short', async () => {
      render(<ContactPage />);
      
      const firstNameInput = screen.getByLabelText(/FIRST_NAME/i);
      fireEvent.change(firstNameInput, { target: { value: 'A' } });
      fireEvent.blur(firstNameInput);
      
      await waitFor(() => {
        expect(screen.getByText('Ad 2-50 karakter arasında olmalıdır')).toBeInTheDocument();
      });
    });

    it('shows error when firstName contains numbers', async () => {
      render(<ContactPage />);
      
      const firstNameInput = screen.getByLabelText(/FIRST_NAME/i);
      fireEvent.change(firstNameInput, { target: { value: 'Ahmet123' } });
      fireEvent.blur(firstNameInput);
      
      await waitFor(() => {
        expect(screen.getByText('Ad sadece harflerden oluşmalıdır')).toBeInTheDocument();
      });
    });

    it('accepts valid Turkish firstName', async () => {
      render(<ContactPage />);
      
      const firstNameInput = screen.getByLabelText(/FIRST_NAME/i);
      fireEvent.change(firstNameInput, { target: { value: 'Hikmet' } });
      fireEvent.blur(firstNameInput);
      
      await waitFor(() => {
        expect(screen.queryByText('Ad zorunludur')).not.toBeInTheDocument();
        expect(screen.queryByText('Ad 2-50 karakter arasında olmalıdır')).not.toBeInTheDocument();
      });
    });

    it('shows error when lastName is empty', async () => {
      render(<ContactPage />);
      
      const lastNameInput = screen.getByLabelText(/LAST_NAME/i);
      fireEvent.change(lastNameInput, { target: { value: '' } });
      fireEvent.blur(lastNameInput);
      
      await waitFor(() => {
        expect(screen.getByText('Soyad zorunludur')).toBeInTheDocument();
      });
    });

    it('shows error when email is invalid', async () => {
      render(<ContactPage />);
      
      const emailInput = screen.getByLabelText(/EMAIL/i);
      fireEvent.change(emailInput, { target: { value: 'notanemail' } });
      fireEvent.blur(emailInput);
      
      await waitFor(() => {
        expect(screen.getByText('Geçerli bir e-posta adresi giriniz')).toBeInTheDocument();
      });
    });

    it('accepts valid email format', async () => {
      render(<ContactPage />);
      
      const emailInput = screen.getByLabelText(/EMAIL/i);
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.blur(emailInput);
      
      await waitFor(() => {
        expect(screen.queryByText('Geçerli bir e-posta adresi giriniz')).not.toBeInTheDocument();
      });
    });

    it('shows error when subject is too short', async () => {
      render(<ContactPage />);
      
      const subjectInput = screen.getByLabelText(/SUBJECT/i);
      fireEvent.change(subjectInput, { target: { value: 'Hi' } });
      fireEvent.blur(subjectInput);
      
      await waitFor(() => {
        expect(screen.getByText('Konu 5-200 karakter arasında olmalıdır')).toBeInTheDocument();
      });
    });

    it('shows error when message is too short', async () => {
      render(<ContactPage />);
      
      const messageInput = screen.getByLabelText(/TRANSMISSION_BODY/i);
      fireEvent.change(messageInput, { target: { value: 'Short' } });
      fireEvent.blur(messageInput);
      
      await waitFor(() => {
        expect(screen.getByText('Mesaj 20-2000 karakter arasında olmalıdır')).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    const validFormData = {
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      email: 'ahmet@example.com',
      subject: 'Yeni Proje Fikri',
      message: 'Merhaba, yeni projeniz hakkında bil almak istiyorum.'
    };

    it('shows loading state during submission', async () => {
      mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves
      
      render(<ContactPage />);
      
      // Fill form
      fireEvent.change(screen.getByLabelText(/FIRST_NAME/i), { target: { value: validFormData.firstName } });
      fireEvent.change(screen.getByLabelText(/LAST_NAME/i), { target: { value: validFormData.lastName } });
      fireEvent.change(screen.getByLabelText(/EMAIL/i), { target: { value: validFormData.email } });
      fireEvent.change(screen.getByLabelText(/SUBJECT/i), { target: { value: validFormData.subject } });
      fireEvent.change(screen.getByLabelText(/TRANSMISSION_BODY/i), { target: { value: validFormData.message } });
      
      fireEvent.click(screen.getByRole('button', { name: /TRANSMIT_MESSAGE/i }));
      
      await waitFor(() => {
        expect(screen.getByText('GÖNDERİLİYOR...')).toBeInTheDocument();
      });
    });

    it('shows success toast on successful submission', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: { id: 'msg_123', message: 'Mesajınız başarıyla gönderildi!' }
        })
      });
      
      render(<ContactPage />);
      
      fireEvent.change(screen.getByLabelText(/FIRST_NAME/i), { target: { value: validFormData.firstName } });
      fireEvent.change(screen.getByLabelText(/LAST_NAME/i), { target: { value: validFormData.lastName } });
      fireEvent.change(screen.getByLabelText(/EMAIL/i), { target: { value: validFormData.email } });
      fireEvent.change(screen.getByLabelText(/SUBJECT/i), { target: { value: validFormData.subject } });
      fireEvent.change(screen.getByLabelText(/TRANSMISSION_BODY/i), { target: { value: validFormData.message } });
      
      fireEvent.click(screen.getByRole('button', { name: /TRANSMIT_MESSAGE/i }));
      
      await waitFor(() => {
        expect(screen.getByText('Mesajınız başarıyla gönderildi!')).toBeInTheDocument();
      });
    });

    it('shows error toast on failed submission', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: async () => ({
          success: false,
          error: { code: 'SERVER_ERROR', message: 'Sunucu hatası oluştu' }
        })
      });
      
      render(<ContactPage />);
      
      fireEvent.change(screen.getByLabelText(/FIRST_NAME/i), { target: { value: validFormData.firstName } });
      fireEvent.change(screen.getByLabelText(/LAST_NAME/i), { target: { value: validFormData.lastName } });
      fireEvent.change(screen.getByLabelText(/EMAIL/i), { target: { value: validFormData.email } });
      fireEvent.change(screen.getByLabelText(/SUBJECT/i), { target: { value: validFormData.subject } });
      fireEvent.change(screen.getByLabelText(/TRANSMISSION_BODY/i), { target: { value: validFormData.message } });
      
      fireEvent.click(screen.getByRole('button', { name: /TRANSMIT_MESSAGE/i }));
      
      await waitFor(() => {
        expect(screen.getByText('Sunucu hatası oluştu')).toBeInTheDocument();
      });
    });

    it('shows error toast on network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));
      
      render(<ContactPage />);
      
      fireEvent.change(screen.getByLabelText(/FIRST_NAME/i), { target: { value: validFormData.firstName } });
      fireEvent.change(screen.getByLabelText(/LAST_NAME/i), { target: { value: validFormData.lastName } });
      fireEvent.change(screen.getByLabelText(/EMAIL/i), { target: { value: validFormData.email } });
      fireEvent.change(screen.getByLabelText(/SUBJECT/i), { target: { value: validFormData.subject } });
      fireEvent.change(screen.getByLabelText(/TRANSMISSION_BODY/i), { target: { value: validFormData.message } });
      
      fireEvent.click(screen.getByRole('button', { name: /TRANSMIT_MESSAGE/i }));
      
      await waitFor(() => {
        expect(screen.getByText('Bağlantı hatası. Lütfen daha sonra tekrar deneyin.')).toBeInTheDocument();
      });
    });
  });

  describe('Page Layout', () => {
    it('renders contact form with all required fields', () => {
      render(<ContactPage />);
      
      expect(screen.getByLabelText(/FIRST_NAME/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/LAST_NAME/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/EMAIL/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/SUBJECT/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/TRANSMISSION_BODY/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /TRANSMIT_MESSAGE/i })).toBeInTheDocument();
    });

    it('renders availability status indicator', () => {
      render(<ContactPage />);
      
      expect(screen.getByText('SYSTEM_READY // AVAILABLE_FOR_NEW_PROJECTS')).toBeInTheDocument();
    });

    it('renders contact metadata section', () => {
      render(<ContactPage />);
      
      expect(screen.getByText('CONTACT_METADATA')).toBeInTheDocument();
      expect(screen.getByText(/hikmet@hgconsole.dev/i)).toBeInTheDocument();
      expect(screen.getByText(/Türkiye/i)).toBeInTheDocument();
    });

    it('renders external nodes/social links section', () => {
      render(<ContactPage />);
      
      expect(screen.getByText('EXTERNAL_NODES')).toBeInTheDocument();
    });

    it('renders decorative terminal card', () => {
      render(<ContactPage />);
      
      expect(screen.getByText(/npm install passion@latest/i)).toBeInTheDocument();
      expect(screen.getByText(/signal strength: 100%/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('form inputs have proper labels', () => {
      render(<ContactPage />);
      
      const firstNameInput = screen.getByLabelText(/FIRST_NAME/i);
      const lastNameInput = screen.getByLabelText(/LAST_NAME/i);
      const emailInput = screen.getByLabelText(/EMAIL/i);
      const subjectInput = screen.getByLabelText(/SUBJECT/i);
      const messageInput = screen.getByLabelText(/TRANSMISSION_BODY/i);
      
      expect(firstNameInput).toHaveAttribute('id', 'firstName');
      expect(lastNameInput).toHaveAttribute('id', 'lastName');
      expect(emailInput).toHaveAttribute('id', 'email');
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(subjectInput).toHaveAttribute('id', 'subject');
      expect(messageInput).toHaveAttribute('id', 'message');
    });

    it('submit button is disabled during submission', async () => {
      mockFetch.mockImplementation(() => new Promise(() => {}));
      
      render(<ContactPage />);
      
      const validFormData = {
        firstName: 'Ahmet',
        lastName: 'Yılmaz',
        email: 'ahmet@example.com',
        subject: 'Yeni Proje Fikri',
        message: 'Merhaba, yeni projeniz hakkında bilgi almak istiyorum.'
      };
      
      fireEvent.change(screen.getByLabelText(/FIRST_NAME/i), { target: { value: validFormData.firstName } });
      fireEvent.change(screen.getByLabelText(/LAST_NAME/i), { target: { value: validFormData.lastName } });
      fireEvent.change(screen.getByLabelText(/EMAIL/i), { target: { value: validFormData.email } });
      fireEvent.change(screen.getByLabelText(/SUBJECT/i), { target: { value: validFormData.subject } });
      fireEvent.change(screen.getByLabelText(/TRANSMISSION_BODY/i), { target: { value: validFormData.message } });
      
      const submitButton = screen.getByRole('button', { name: /TRANSMIT_MESSAGE/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });
  });
});
