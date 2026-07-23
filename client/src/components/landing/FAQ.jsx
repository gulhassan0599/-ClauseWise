import React from 'react';

const FAQ = () => {
  return (
    <section className="py-5 mb-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">Frequently Asked Questions</h2>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion glass-panel" id="faqAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                    Is this a replacement for a real lawyer?
                  </button>
                </h2>
                <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                  <div className="accordion-body text-muted">
                    No. ClauseWise is designed to help you quickly understand the contents of a contract, but it does not provide legal advice. You should always consult a qualified attorney for critical legal matters.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                    Are my documents safe?
                  </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body text-muted">
                    Yes. We process your documents temporarily in memory to generate the analysis. Once the analysis is complete, the file is immediately deleted from our servers.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                    What file formats are supported?
                  </button>
                </h2>
                <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body text-muted">
                    Currently, we only support text-based PDF documents. Image-based (scanned) PDFs and Word documents will be supported in future updates.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
