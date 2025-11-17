import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import './EditarComment.scss';
import type { Comment } from '../../types/Comment';
import { useUpdateComment } from '../../hooks/useComments';
import type { CommentUpdate } from '../../types/dtos/CommentUpdate';

type EditarCommentProps = {
    comment: Comment;
    isOpen: boolean;
    onClose: () => void;
    postId: string;
};

const EditarComment = ({ comment, isOpen, onClose, postId }: EditarCommentProps) => {
    const [content, setContent] = useState<CommentUpdate>({ comment: '', content: '' });
    const { mutate: updateComment, isPending } = useUpdateComment(postId);

    useEffect(() => {
        if (isOpen && comment) {
            setContent({ comment: comment.id, content: comment.content });
        }
    }, [comment, isOpen]);

    const handleSave = () => {
        if (!content.content.trim()) {
            toast.error('O conteúdo não pode estar vazio.');
            return;
        }

        updateComment(content, {
            onSuccess: () => {
                toast.success('Comentário atualizado com sucesso!');
                onClose();
            },
            onError: () => {
                toast.error('Erro ao atualizar o comentário.');
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h3>Editar Comentário</h3>
                <textarea
                    value={content.content}
                    onChange={(e) => setContent({ ...content, content: e.target.value })}
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

export default EditarComment;
