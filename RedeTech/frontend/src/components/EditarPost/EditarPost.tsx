import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import type { Post } from '../../types/post';
import './EditarPost.scss';
import { useUpdatePost } from '../../hooks/usePosts';

type EditarPostProps = {
    post: Post;
    isOpen: boolean;
    onClose: () => void;
};

const EditarPost = ({ post, isOpen, onClose }: EditarPostProps) => {
    const [content, setContent] = useState('');
    const { mutate: updatePost, isPending } = useUpdatePost();

    useEffect(() => {
        if (isOpen) setContent(post.content);
    }, [post, isOpen]);

    const handleSave = () => {
        if (!content.trim()) {
            toast.error('O conteúdo não pode estar vazio.');
            return;
        }

        updatePost(
            { post: post._id, content },
            {
                onSuccess: () => {
                    toast.success('Post atualizado com sucesso!');
                    onClose();
                },
                onError: () => {
                    toast.error('Ocorreu algum erro ao atualizar o post.');
                },
            }
        );
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h3>Editar Post</h3>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Digite o novo conteúdo..."
                    rows={6}
                />
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose} disabled={isPending}>
                        Cancelar
                    </button>
                    <button className="btn-save" onClick={handleSave} disabled={isPending}>
                        {isPending ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditarPost;
