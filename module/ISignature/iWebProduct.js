/**��������**/
$(function(){

    //����
    var isNotLoad = true;
    $(".tableAll").click(function(){
        if(isNotLoad){
            isNotLoad = false;     
              var noneY = $(this).next().css("display");
              $(".tableAll").next().css("display","none");
              $(".tableAll").find('td:eq(0)').css({'background-color':'#E6DBEC'});
              $(".tableAll").find('span:eq(0)').html('+');

                  if( noneY== 'none'){
                      var s = $(this).find('td:eq(0)').html();                
                      $(this).find('td:eq(0)').html(s.replace("+", "-")) ;                              
                      $(this).find('td:eq(0)').css({'background-color':'#FFFFFF'});
                      $(this).next().slideToggle(function(){isNotLoad = true;});
                  }else{
                      isNotLoad = true;
                  }
            }
    });
    //����
    var hide = false;
    $("#disPlayNone").click(function(){
        
         if(hide){
             $('#showTD').width('204px');
             $(this).siblings().css("display", "")
            
             hide = false;
         }else{    
             $('#showTD').width('25px');
             $(this).siblings().css("display", "none")
             hide = true;
         }

    });    
    //״̬��Ϣ
    function addState(value){
        $("#state").html(value);    
    }
    //���ĵ�
    function WebOpen()
    {   
        iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.WebUrl = url+"PDFServer.php";
        var tempFile = iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.CreateTempFileName();
        iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.SetMsgByName("DBSTEP","DBSTEP");
        iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.SetMsgByName("OPTION","LOADFILE");
        iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.SetMsgByName("FILETYPE","PDF");
        iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.SetMsgByName("USERNAME","��ʾ��");
        iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.SetMsgByName("RECORDID",mRecordID);
        iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.SetMsgByName("FILENAME","test.pdf");
        if ( iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.PostDBPacket(false))
        { 
            iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.MsgFileSave(tempFile);
            
            iWebPDF2015.Documents.Open(tempFile);
            iWebPDF2015.Documents.ActiveDocument.Views.ActiveView.Zoom = 100;
            addState("�򿪳ɹ�");
        }
        else
        {
            addState("��ʧ��");
        }
    }
    /*if(mRecordID != 'null' && mIsExsitRId){
        WebOpen();
    }
    */

    

/**�ĵ�����**/
        

$("#saveFile").click(function(){
    try{
        //���߱����ĵ�
        if ( 0 == iWebPDF2015.Documents.Count )
        {
            alert("û��Ҫ������ĵ�");
            return;
        }
        iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.WebUrl = url+"PDFServer.php";
        var tempFile = iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.CreateTempFileName();
        iWebPDF2015.Documents.ActiveDocument.Save(tempFile);
        iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.MsgFileLoad(tempFile);
        iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.SetMsgByName("DBSTEP","DBSTEP");
        iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.SetMsgByName("OPTION","SAVEFILE");
        iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.SetMsgByName("FILETYPE","PDF");
        iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.SetMsgByName("USERNAME","��ʾ��");
        iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.SetMsgByName("RECORDID",mRecordID);
        iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.SetMsgByName("FILENAME","test.pdf");
    
        if (iWebPDF2015.COMAddins("KingGrid.MsgServer2000").Object.PostDBPacket(false))
        { 
            
            $('#Subject').val($('#txtSubject').val());
            $('#Author').val($('#txtAuthor').val());
            $('#iWebPDF').submit();
            addState("����ɹ����ĵ�����ǣ�"+mRecordID);
        }
        else
        {
            addState("ʧ�ܳɹ���");
        }
    }catch(e){
      addState("��ʧ��"); 
      alert(e.description);
    }                                 
});        
    
    
    
    
/** �ĵ��Ķ�����**/    

  //�򿪱����ĵ�            
  $("#openLocalFile").click(function(){
     try{

        iWebPDF2015.Documents.Open();
        addState("�򿪳ɹ�");
     }catch(e){
        addState("��ʧ��"); 
        alert(e.description);
     }                                 
  });           
           
  //���汾���ĵ�
  $("#saveLocalFile").click(function(){
     try{
           if ( 0 == iWebPDF2015.Documents.Count ){
                alert("û���Ѵ��ĵ�");
                return;
        }
        iWebPDF2015.Documents.ActiveDocument.Save();
        addState("����ɹ�");
        alert('����ɹ�');
     }catch(e){
       addState("��ʧ��");      
       alert(e.description);
     }                                 
  });
           
  //�رյ�ǰ���ĵ�
   $("#closeActiveFile").click(function(){
     try{
        if ( 0 == iWebPDF2015.Documents.Count ){
                alert("û���Ѵ��ĵ�");
                return;
        }
        iWebPDF2015.Documents.ActiveDocument.Close();
        addState("�رճɹ�");
     }catch(e){
       addState("�ر�ʧ��");      
       alert(e.description);
     }                                 
  });
   
  //�ر������ĵ�
  $("#closeAllFile").click(function(){
     try{
           if ( 0 == iWebPDF2015.Documents.Count ){
                alert("û���Ѵ��ĵ�");
                return;
        }
        iWebPDF2015.Documents.CloseAll();
        addState("�رճɹ�");
     }catch(e){
       addState("�ر�ʧ��");      
       alert(e.description);
     }                                 
  });
  //��һҳ
  
  
  $("#getVersion").click(function(){
         try{
             
             alert(iWebPDF2015.Version);
            addState("��ȡ�ɹ���");
         }catch(e){
           addState("��ȡʧ�ܡ�");      
           alert(e.description);
         }                                 
   });
  
  $("#moveToNextPage").click(function(){
     try{
           if ( 0 == iWebPDF2015.Documents.Count ){
                alert("û���Ѵ��ĵ�");
                return;
        } 
        iWebPDF2015.Documents.CloseAll();
        addState("�رճɹ�");
     }catch(e){
       addState("�ر�ʧ��");      
       alert(e.description);
     }                                 
  });  


/** �ĵ����ƹ���**/    
  
  //���ҳ
  $("#addPage").click(function(){
     try{
      if ( 0 == iWebPDF2015.Documents.Count ){
            alert("û���Ѵ��ĵ�");
            return;
      }
      if(!iWebPDF2015.Documents.ActiveDocument.HasPermissions(1)){
        alert("��û���޸ĵ�Ȩ�ޣ��޷�����ҳ��");  
      }
      if (iWebPDF2015.Documents.ActiveDocument.Pages.Add(592, 842, 0, 0)){
            //iWebPDF2015.Documents.ActiveDocument.Views.Item(0);
            addState("����ҳ�ɹ���"); 
      }else{
        addState("����ҳʧ�ܣ�"); 
      }
     }catch(e){
       addState("����ҳʧ��");      
       alert(e.description);
     }                                 
  }); 
  
  //��ӹ�����
  $("#addToolBar").click(function(){
     try{
           if ( 0 == iWebPDF2015.Documents.Count ){
                alert("û���Ѵ��ĵ�");
                return;
        }         
        var custombar = iWebPDF2015.CommandBars.Add("Custom");
        var btn = custombar.Controls.Add(1);
        btn.Style = 2;
        btn.Caption = "Custom";
        btn.FaceId = 4;
        btn.Enabled = 1;
        comdbarID = btn.ID;
        
        btn = custombar.Controls.Add();
        btn.Style = 2;
        btn.Caption = "Custom1";
        btn.FaceId = 2;
        btn.Enabled = 0;
        
        custombar.Update();
        custombar.ShowPopup(0, 0);    
        addState("���2����ť�ɹ���"); 
      }catch(e){
       addState("��Ӱ�ťʧ�ܡ�");      
       alert(e.description);
      }        
  }); 
  

  //��Ӳ˵�
  $("#addMenu").click(function(){
     try{
         
           if ( 0 == iWebPDF2015.Documents.Count ){
                alert("û���Ѵ��ĵ�");
                return;
        }         
         var menubar = iWebPDF2015.CommandBars.Item("MenuBar");
        var popup = menubar.Controls.Add(3, 5);
        popup.Caption = "TestCustomMenus";
        var btn = popup.Controls.Add();
        btn.Caption = "Menu1";
        menuid = btn.ID;
        
        btn = popup.Controls.Add();
        btn.Caption = "Menu2";
        btn.Check = true;
        //iWebPDF2015.Images.Add("C:\\Program Files\\iSignature_V8\\plugins\\iWebPDF2015.Annots\\images\\IDB_BMP_ARROW_24.png", menuid);
        menubar.Update();
        addState("��Ӳ˵��ɹ�");      
      }catch(e){
       addState("��Ӳ˵�ʧ�ܡ�");      
       alert(e.description);
      }        
  }); 
  
  //���ˮӡ
  
  $("#Watermark").click(function(){
         try{
           if ( 0 == iWebPDF2015.Documents.Count ){
                    alert("û���Ѵ��ĵ�");
                    return;
           }
             
            var Watermark = iWebPDF2015.Documents.ActiveDocument.Watermark;
            Watermark.FontColor= "001";
            Watermark.FontSize = 100;
            Watermark.Opacity = 10;
            Watermark.Rotation = 40;
            Watermark.Text = "Watermark";
            Watermark.Execute(0, 50, 400);
            addState("���ˮӡ�ɹ�");      
          }catch(e){
           addState("���ˮӡʧ�ܡ�");      
           alert(e.description);
          }        
      }); 
  //��ȡ�ĵ�����
  $("#getContext").click(function(){
         try{
           if ( 0 == iWebPDF2015.Documents.Count ){
                    alert("û���Ѵ��ĵ�");
                    return;
           } 
          alert(iWebPDF2015.Documents.ActiveDocument.Pages(0).Text);
          }catch(e){
           addState("��ȡʧ�ܡ�");      
           alert(e.description);
          }        
      }); 
  
/** �ĵ���ע����**/    

  //���ͼƬ��ע
  $("#addPictureAnnot").click(function(){
     try{                              
        if ( 0 == iWebPDF2015.Documents.Count )
        {
            alert("û���Ѵ��ĵ�");
            return;
        }
        alert("��ȷ��C����a.jpgͼƬ����");
        var annot = iWebPDF2015.Documents.ActiveDocument.Pages(0).Annots.Add(12);
        annot.FromDeviceRect(100,100,200,200);
        annot.BlendMode = "Multiply";
        annot.Title = "Admin";
        annot.Color = 255;
        annot.ImageAppearance("c:\\a.jpg");
        iWebPDF2015.Documents.ActiveDocument.Views.ActiveView.Refresh();
        addState("���ͼƬ��ע�ɹ�");      
      }catch(e){
       addState("���ͼƬ��עʧ�ܡ�");      
       alert(e.description);
      }        
  }); 


  //��ȡ��ע����
  $("#getAnnotCount").click(function(){
     try{                              
        if ( 0 == iWebPDF2015.Documents.Count ){
            alert("û���Ѵ��ĵ�");
            return;
        }
        var nAnnot = iWebPDF2015.Documents.ActiveDocument.Pages.Item(0).Annots.Count;
        alert("�ĵ��й�����ע"+nAnnot); 
      }catch(e){
       addState("��ȡʧ�ܡ�");      
       alert(e.description);
      }        
  }); 

  //���ͼƬ��
  $("#addPicSigfield").click(function(){
     try{                              
        if ( 0 == iWebPDF2015.Documents.Count )
        {
            alert("û���Ѵ��ĵ�");
            return;
        }

        var fields = iWebPDF2015.Documents.ActiveDocument.Fields;
        var field = fields.Add(6);
        field.Name = "Signature100";
        var widget = field.AddToPage(0);;
        widget.FromDeviceRect(100, 100, 200, 200);
        widget.ImageAppearance("C:\\aa.jpg");//����ͼƬ���
        iWebPDF2015.Documents.ActiveDocument.Save();
        addState("���ͼƬ�ɹ���");      
      }catch(e){
       addState("���ͼƬʧ�ܡ�");      
       alert(e.description);
      }        
     
  });   
  
  //��ת��ָ����
  $("#gotoFields").click(function(){
     try{                              
        if ( 0 == iWebPDF2015.Documents.Count ){
            alert("û���Ѵ��ĵ�");
            return;
        }
        var fields = iWebPDF2015.Documents.ActiveDocument.Fields;
        if(fields.Count != 0){
            fields(0).Goto();
        }else{
            alert("�ĵ��в�������");
        }    
        addState("��ת��ָ����ʧ�ܡ�");     
      }catch(e){
       addState("��ת��ָ����ʧ�ܡ�");      
       alert(e.description);
      }        
  }); 
  
    //��Ӹ���
  $("#addAttchments").click(function(){
     try{
            if ( 0 == iWebPDF2015.Documents.Count )
            {
                alert("û���Ѵ��ĵ�");
                return;
            }         
        iWebPDF2015.COMAddins("KingGrid.iWebPDF2015").Object.AddAttachments("C://test.pdf","test.pdf")
        addState("��Ӹ����ɹ���");     
      }catch(e){
       addState("��Ӹ���ʧ�ܡ�");      
       alert(e.description);
      }        
  }); 
  
  //ͼƬǩ��
  
  $("#Signature").click(function(){
         try{    
                if ( 0 == iWebPDF2015.Documents.Count )
                {
                    alert("û��Ҫǩ�����ĵ�");
                    return;
                }
                
                var addin = iWebPDF2015.COMAddins("KingGrid.iWebPDF2015").Object;
                addin.SignaturePages = "1-2";  
                //0 �������� 1 ������� 2 �ı���λ 3 ��λ 4δǩ���������ǩ��
                
                addin.SignaturePosMode = 1;
                addin.SignaturePos = "50*50";
                
                addin.SignatureWidth = 4;
                addin.SignatureHeight = 4;
                //ָ����ǩ������
                addin.SignatureImage = 1;
                //ָ��ǩ��ͼƬ·��
                addin.SignatureImage = "C:/aa.jpg";
                //addin.SignatureImage ="http://www.kinggrid.com/images/logo.jpg";
                //addin.SignatureCSP = "EnterSafe ePass3003 CSP v1.0";
                //addin.SignaturePIN = "123456";
                //addin.SignatureCert = "���Ӣ_����";
                addin.CreateSignature();
                addState("ǩ���ɹ���");     
          }catch(e){
               addState("ǩ��ʧ��  ��");      
               alert(e.description);
          }        
      });
  
  //ɾ�����и���
  $("#delAttchments").click(function(){
         try{    
                if ( 0 == iWebPDF2015.Documents.Count ){
                    alert("û��Ҫǩ�����ĵ�");
                    return;
                }
                iWebPDF2015.COMAddins("KingGrid.iWebPDF2015").Object.DelAttachments("");
                addState("ɾ�������ɹ���");     
          }catch(e){
               addState("ɾ������ʧ��  ��");      
               alert(e.description);
          }        
      }); 
  //ɾ�����е�ǩ��
  $("#delFields").click(function(){
         try{    
                if ( 0 == iWebPDF2015.Documents.Count )
                {
                    alert("û���Ѵ��ĵ�");
                    return;
                }
                var fields = iWebPDF2015.Documents.ActiveDocument.Fields;
                var count = fields.SignatureCount;
                
                for(var i=0; i<count; i++)
                {
                    var sigfield = fields.SignatureField(0);
                    sigfield.ClearSignature();
                    sigfield.Delete();
                }
                var nDle = count - fields.SignatureCount;
                iWebPDF2015.Documents.ActiveDocument.Save();
                addState("ɾ���ɹ�����ɾ����ǩ����"+nDle+"��");     
          }catch(e){
               addState("ɾ��ʧ��  ��");      
               alert(e.description);
          }        
      });      
})

    
    
    