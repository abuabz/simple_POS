var emptyRow="<tr><td colspan='5' class='text-center' style='color:white' >NO PRODUCTS</td></tr>"; 
var emptyRow2="<tr><td colspan='6'  class='text-center' style='color:white' >NO PRODUCTS ARE SELECTED</td></tr>"; 

$(document).ready(function () {
  
    

    $("#tblData tbody").append(emptyRow);
    $("#table-div").hide();
    $("#table-bill").hide();
    $("#main").hide();
    $("#select-customer").hide();
    
    $(".cust-name").hide();
    var i=0;

    $("#add-btn-product").click(function (e) {  //add product button function
        i++;
        $("#table-div").show();
        var prname=$("#product_name").val().trim();
        var prprice=$("#product_price").val().trim();

        if(prname != "" && prprice != ""){
          
            if($("#tblData  tbody").children().children().length ==1){
                $("#tblData  tbody").html("");
            }
            var dynamicTr="<tr id='row"+i+"'><td id='prname"+i+"' style='color:white'>"+prname+"</td><td id='prprice"+i+"'  style='color:white'>"+prprice+"</td><td><button  id='btn"+i+"' style='width:100px;' class='btn btn-success  btn-edit'>Order</button> </td> </tr>";
     
            $("#tblData  tbody").append(dynamicTr);

            $("#product_name").val("")
            $("#product_price").val("")

    
        }
        var newPrice=0;
        $('#btn'+i+"").click(function () { //order button function 
            
            var dynamictable="<tr id='row"+i+"'><td id='prname"+i+"' style='color:white'>"+prname+"</td><td id='prprice"+i+"'  style='color:white'>"+prprice +"</td> <td><input  type='number' class='quantity'  value='1' required></td><td  class='total' style='color:white'>"+prprice+" </td> <td><button class='btn btn-danger btn-sm'>Delete </button> </td> </tr>";
        
            $("#tbl-bill  tbody").append(dynamictable);
            const numInputs = document.querySelectorAll('input[type=number]')
                numInputs.forEach(function(input) {
                    input.addEventListener('change', function(e) {
                      if (e.target.value <=0) {
                        e.target.value = 1
                      }
                    })
                  })
            $('.quantity').change(function () { //quantity change function
                
                m=1;
                var qtny = ($(this).val());
                var pri =parseInt($(this).parents("tr").children('td:eq(1)')[0].innerHTML);
                if(qtny<=0){
                    $(".quantity").append(m)

                }
                else{
                    newPrice = parseInt(qtny) * pri;
                    $('#total').val(newPrice);
                    $(this).parents("tr").children('td:eq(3)').html(newPrice)
                }
                
               
                calc_total();
            });
            calc_total();
            function calc_total(){ //quantity based sum
                var sum = 0;
                $(".total").each(function(){
                  sum += parseFloat($(this).text());
                });
                $('#sum').text(sum);
              }
           
            function calc_total(){
                var sum = 0;
                $(".total").each(function(){
                  sum += parseFloat($(this).text());
                });
                $('#sum').text(sum);
              }

            $(".btn-sm").click(function(){ //delete button working
                $(this).parent().parent().remove();
                if($("#tbl-bill tbody").children().children().length == 0){
                    $("#tbl-bill  tbody").append(emptyRow2);
                }
            })
         
        });
      
    
    });

    $('#add-btn-customer').click(function (e) { //add button customer 
        $("#select-customer").show(); //select box show
        $(".cust-name").show();

        var CusName=$("#customer_name").val().trim();
        $("#table-bill").show();

        if(CusName !=""){
            if($("#select-box1").children().length ==1){
                // $(Option).html("");
            }
            var dynamicoptions="<option value="+CusName+">"+CusName+"</option>"

            $("#select-box1").append(dynamicoptions);

            $("#customer_name").val("")
        }
        
    });

    $("#select-box1").change(function () { //customer name passing to table cus
        var CustName =$("#select-box1 option:selected").val();
        if(CustName != ""){
          
            if($("#cusname tbody").children().children().length ==1){
                $("#cusname  tbody").html("");
            }
            var dynamicTr1="<tr><td  class='text-center'  style='color:white'>"+CustName+"</td></tr>";
     
            $("#tbl-cusname  tbody").append(dynamicTr1);

            $("#select-box1 option").val();
    
        }
    });
    $("#btn-invoice").click(function () { //invoice button working 
        $("#main").toggle("slow", function() {});// id=main 

        
    });
    
    $("#select-box1").change(function () { //customer name passing to invoice
        var CustName =$("#select-box1 option:selected").val();
        if(CustName != ""){
          

            
            $("#cus-name").append(CustName);
                  
            $("#select-box1 option").val();
    
        }
    });    
    $("#close").click(function (e) { //close icon
        $("#main").hide();
        $("#tbl-invoice  tbody").html("")
    });
    $("#complete").click(function (e) { //invoice page popup
        calc_total();

        var $tr    =$("#tbl-bill  tbody").children()  
        console.log($tr)    
        var $clone = $tr.clone();
        $clone.find(':text').val('');
        $("#tbl-invoice  tbody").append($clone);
        $(".btn-sm").hide();
        

    });
    var d = new Date(); //date invoice

    var month = d.getMonth()+1;
    var day = d.getDate(); 
    
    var output = (day<10 ? '0' : '') + day +'/' + (month<10 ? '0' : '') + month + '/' +d.getFullYear() ;
         
    $("#datee").append(output);
    
   
    function calc_total(){ //invoice total sum
        var sum = 0;
        $(".total").each(function(){
          sum += parseFloat($(this).text());
        });
        $('#summ').text(sum);
      }
    
});