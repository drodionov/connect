import useLoginModal from "@/hooks/useLoginModal";
import {useCallback, useState} from "react";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import useRegisterModal from "@/hooks/useRegisterModal";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      //TODO: add register and login

      registerModal.onClose();
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }, [loginModal]);

  const bodyContent = (
      <div className="flex flex-col gap-4">
        <Input placeholder="Email" onChange={(event) => setEmail(event.target.value)} value={email}
               disabled={isLoading}/>
        <Input placeholder="Name" onChange={(event) => setName(event.target.value)} value={name}
               disabled={isLoading}/>
        <Input placeholder="Username" onChange={(event) => setUsername(event.target.value)}
               value={username} disabled={isLoading}/>
        <Input placeholder="Password" onChange={(event) => setPassword(event.target.value)}
               value={password} disabled={isLoading}/>
      </div>
  )

  const footerContent = (
      <div className="text-neutral-400 text-center mt-4">
        <p>Already have an account? <span onClick={onToggle} className="text-white cursor-pointer hover:underline">
            Sign In
          </span>
        </p>
      </div>
  )

  return (
      <Modal disabled={isLoading} isOpen={registerModal.isOpen} title="Create an account"
             actionLabel="Register"
             onClose={registerModal.onClose} onSubmit={onSubmit} body={bodyContent}
             footer={footerContent}/>
  )
}

export default RegisterModal;