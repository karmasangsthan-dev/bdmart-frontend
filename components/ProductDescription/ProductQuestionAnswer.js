import { Pagination, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';



const ProductQuestionAnswer = () => {
    const user = useSelector((state) => state?.auth?.user);
    console.log(user, 'user')
    const router = useRouter();
    const questionData = [
        {
            userName: 'Emily Johnson',
            userEmail: 'emily.johnson@example.com',
            userQuestion: 'Are these sunglasses polarized?',
            adminReply: 'Yes, these sunglasses are polarized, providing enhanced glare reduction and improved clarity.'
        },
        {
            userName: 'John Smith',
            userEmail: 'johnsmith@example.com',
            userQuestion: 'What is the UV protection level of these sunglasses?',
            adminReply: 'These sunglasses offer 100% UV protection, shielding your eyes from harmful UVA and UVB rays.'
        },
        {
            userName: 'Sophia Lee',
            userEmail: 'sophia.lee@example.com',
            userQuestion: 'Do these sunglasses come with a case?',
            adminReply: 'Yes, these sunglasses come with a protective case to keep them safe when not in use.'
        },
        {
            userName: 'Robert Davis',
            userEmail: 'robert.davis@example.com',
            userQuestion: 'Are these sunglasses suitable for sports activities?',
            adminReply: 'Absolutely! These sunglasses are designed for sports, providing a secure and comfortable fit during physical activities.'
        },
        {
            userName: 'Alexandra Moore',
            userEmail: 'alexandra.moore@example.com',
            userQuestion: 'Can the lenses be replaced with prescription lenses?',
            adminReply: 'Yes, these sunglasses can be fitted with prescription lenses. You can take them to an optician for customization.'
        },
        {
            userName: 'Liam Wilson',
            userEmail: 'liam.wilson@example.com',
            userQuestion: 'Do these sunglasses have adjustable nose pads?',
            adminReply: 'Yes, these sunglasses feature adjustable nose pads for a personalized and comfortable fit on different face shapes.'
        },
        {
            userName: 'Emma Thompson',
            userEmail: 'emma.thompson@example.com',
            userQuestion: 'Are these sunglasses suitable for driving?',
            adminReply: 'Certainly! These sunglasses are designed to reduce glare and enhance visibility, making them ideal for driving.'
        },
        {
            userName: 'Olivia Garcia',
            userEmail: 'olivia.garcia@example.com',
            userQuestion: 'What is the frame material of these sunglasses?',
            adminReply: 'These sunglasses have a durable and lightweight frame made of high-quality acetate for long-lasting comfort.'
        },
        {
            userName: 'Daniel Wilson',
            userEmail: 'daniel.wilson@example.com',
            userQuestion: 'Do these sunglasses have a warranty?',
            adminReply: 'Yes, these sunglasses come with a manufacturers warranty of 2 years against any manufacturing defects.'
        },
        {
            userName: 'Ava Robinson',
            userEmail: 'ava.robinson@example.com',
            userQuestion: 'Are these sunglasses suitable for both men and women?',
            adminReply: 'Absolutely! These sunglasses are designed to be unisex, making them suitable for both men and women.'
        }
    ];
    return (
        <div className='product-description-container product-question-container shadow'>
            <h6 className='heading'>Question About This Product (81)</h6>

            <div className="product-questions-header">
                {
                    !user?.email ? <p className='question-login'><span onClick={() => router.push('/signin')} className='question-answer-login-btn'>Login</span> or <span onClick={() => router.push('/signup')} className='question-answer-login-btn'>Register</span> to ask questions to seller.</p> : (
                        <div>
                            <div className='question-post-container'>
                                <input type="text" placeholder='Ask seller a question' />
                                <button>Ask Question</button>
                            </div>
                            {
                                user?.email && <div>
                                    <p>My Questions</p>
                                    <div className="product-question">
                                        <div className="product-qna ">
                                            <span><img width="20" height="20" src="https://img.icons8.com/ios-filled/50/FA5252/circled-q.png" alt="circled-q" /></span>
                                            <div>
                                                <div className='qna-text'>
                                                    eita ki glass er na ki plastic?
                                                </div>
                                                <div className='question-desc'>
                                                    Md Altaf. - 1 second ago
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            !1 == 1 ? (
                                                <div className="product-qna ">
                                                    <span><img width="20" height="20" src="https://img.icons8.com/ios-filled/50/40C057/xbox-a.png" alt="xbox-a" /></span>
                                                    <div>
                                                        <div className='qna-text'>
                                                            original poly owala polorized sunglass.
                                                        </div>
                                                        <div className='question-desc'>
                                                            Faysal Optics - answered within 1 hours
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="product-qna ">
                                                    <span style={{ width: '20px', height: '20px' }}></span>
                                                    <div className='question-desc'>
                                                        No answer yet
                                                    </div>
                                                </div>
                                            )
                                        }


                                    </div>
                                </div>
                            }

                        </div>
                    )
                }
                <p>Other questions answered by Bangladesh Mart (81)</p>

            </div>

            <div className='all-qna product-questions'>
                {questionData?.slice(0, 3)?.map((question, index) => {
                    return (
                        <div className="product-question">
                            <div className="product-qna ">
                                <span><img width="20" height="20" src="https://img.icons8.com/ios-filled/50/FA5252/circled-q.png" alt="circled-q" /></span>
                                <div>
                                    <div className='qna-text'>
                                        {question?.userQuestion}
                                    </div>
                                    <div className='question-desc'>
                                        {question?.userName} - 4 days ago
                                    </div>
                                </div>

                            </div>
                            <div className="product-qna ">
                                <span><img width="20" height="20" src="https://img.icons8.com/ios-filled/50/40C057/xbox-a.png" alt="xbox-a" /></span>
                                <div>
                                    <div className='qna-text'>
                                        {question?.adminReply}
                                    </div>
                                    <div className='question-desc'>
                                        Faysal Optics - answered within 1 hours
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            

        </div>
    );
};

export default ProductQuestionAnswer;