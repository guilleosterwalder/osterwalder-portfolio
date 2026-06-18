import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule, Editor } from 'ngx-editor';
import { medicalResearchProjectData } from '../../../../core/data/projects/medical-research-project.data';
import { medicalDocumentData } from '../../../../core/data/projects/medical-document.data';
import { SettingsService } from '../../../../core/services/settings.service';
import jsPDF from 'jspdf';
import * as pdfjsLib from 'pdfjs-dist';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-medical-research-project',
  standalone: true,
  imports: [
    FormsModule,
    NgxEditorModule,
  ],
  templateUrl: './medical-research-project.html',
  styleUrl: './medical-research-project.css',
})

export class MedicalResearchProject {
  constructor() {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      new URL(
        'pdfjs-dist/build/pdf.worker.mjs',
        import.meta.url
      ).toString();
  }
  readonly settings = inject(SettingsService);
  readonly project = medicalResearchProjectData;
  readonly editor = new Editor();
  readonly isEditing = signal(false);
  readonly documentContent = signal( medicalDocumentData.content );
  readonly status = signal( medicalDocumentData.status );
  readonly uploadedFileName = signal('');

  save(): void {
    this.isEditing.set(false);
  }

  async exportPdf(): Promise<void> {
  
    const exportContainer =
      document.createElement('div');
  
    exportContainer.innerHTML = `
      <h1>${this.project.title}</h1>
  
      <p>
        <strong>Status:</strong>
        ${this.status()}
      </p>
  
      <p>
        <strong>Author:</strong>
        Guillermo
      </p>
  
      <p>
        <strong>Last Review:</strong>
        Jun 2026
      </p>
  
      <hr>
  
      ${this.documentContent()}
    `;
  
    exportContainer.style.position = 'fixed';
    exportContainer.style.left = '-9999px';
    exportContainer.style.top = '0';
  
    exportContainer.style.width = '800px';
    exportContainer.style.padding = '40px';
  
    exportContainer.style.background = 'white';
    exportContainer.style.color = '#333';
  
    exportContainer.style.fontFamily =
      'Arial, sans-serif';
  
    exportContainer.style.lineHeight = '1.6';
  
    document.body.appendChild(
      exportContainer
    );
  
    const canvas = await html2canvas(
      exportContainer,
      {
        scale: 2,
        backgroundColor: '#ffffff'
      }
    );
  
    document.body.removeChild(
      exportContainer
    );
  
    const imgData =
      canvas.toDataURL('image/png');
  
    const pdf = new jsPDF(
      'p',
      'mm',
      'a4'
    );
  
    const pdfWidth = 190;
  
    const pdfHeight =
      (canvas.height * pdfWidth) /
      canvas.width;
  
    pdf.addImage(
      imgData,
      'PNG',
      10,
      10,
      pdfWidth,
      pdfHeight
    );
  
    pdf.save(
      'medical-research-report.pdf'
    );
  }

  async uploadPdf(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];  
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer
    }).promise;

    let text = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item) =>
          'str' in item
            ? item.str
            : ''
        )
        .join(' ');

      text += pageText + '\n\n';
    }

    this.documentContent.set(`
      <h2>${file.name}</h2>
      <p>${text}</p>
    `);

    this.status.set('Under Review');
  }

}