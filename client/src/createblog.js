import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        category: '',
        content: {
            intro: '',
            sections: [
                { heading: '', paragraph: '' }
            ],
            conclusion: ''
        }
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSectionChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                sections: prev.content.sections.map((section, i) =>
                    i === index ? { ...section, [field]: value } : section
                )
            }
        }));
    };

    const addSection = () => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                sections: [...prev.content.sections, { heading: '', paragraph: '' }]
            }
        }));
    };

    const removeSection = (index) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                sections: prev.content.sections.filter((_, i) => i !== index)
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log('Submitting blog post...');
            const apiUrl = process.env.NODE_ENV === 'production'
                ? '/api/v1/createblog'
                : 'http://localhost:5000/api/v1/createblog';

            console.log('Using API URL:', apiUrl);
            console.log('Form data:', formData);

            const response = await axios.post(apiUrl, formData);
            console.log('Blog post created:', response.data);
            navigate(`/blog/${response.data._id}`);
        } catch (error) {
            console.error('Error creating blog post:', error);
            console.error('Error details:', error.response ? error.response.data : 'No response data');
            setError('Error creating blog post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-blog-container">
            <h2>Create New Blog Post</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="create-blog-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="Technology">Technology</option>
                        <option value="Programming">Programming</option>
                        <option value="Data Science">Data Science</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="Productivity">Productivity</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="content.intro">Introduction</label>
                    <textarea
                        id="content.intro"
                        name="content.intro"
                        value={formData.content.intro}
                        onChange={handleInputChange}
                        required
                        rows="4"
                    />
                </div>

                <div className="sections-container">
                    <h3>Content Sections</h3>
                    {formData.content.sections.map((section, index) => (
                        <div key={index} className="section-group">
                            <div className="form-group">
                                <label htmlFor={`section-heading-${index}`}>Section Heading</label>
                                <input
                                    type="text"
                                    id={`section-heading-${index}`}
                                    value={section.heading}
                                    onChange={(e) => handleSectionChange(index, 'heading', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor={`section-paragraph-${index}`}>Section Content</label>
                                <textarea
                                    id={`section-paragraph-${index}`}
                                    value={section.paragraph}
                                    onChange={(e) => handleSectionChange(index, 'paragraph', e.target.value)}
                                    required
                                    rows="4"
                                />
                            </div>
                            {index > 0 && (
                                <button
                                    type="button"
                                    className="remove-section"
                                    onClick={() => removeSection(index)}
                                >
                                    Remove Section
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        className="add-section"
                        onClick={addSection}
                    >
                        Add Section
                    </button>
                </div>

                <div className="form-group">
                    <label htmlFor="content.conclusion">Conclusion</label>
                    <textarea
                        id="content.conclusion"
                        name="content.conclusion"
                        value={formData.content.conclusion}
                        onChange={handleInputChange}
                        required
                        rows="4"
                    />
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Blog Post'}
                </button>
            </form>
        </div>
    );
};

export default CreateBlog; 