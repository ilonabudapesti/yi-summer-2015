// AJAX in ExpressionEngine

//PHP:

//pi.vmg_yi_helper.php
public function action_id_json()
{
    $classes = explode('|', $this->EE->TMPL->fetch_param('classes'));
    $data = array();

    if (is_array($classes) && ! empty($classes)) {
        $results = $this->EE->db->from('actions')
            ->where_in('class', $classes)
            ->get()
            ->result_array();

        foreach ($results AS $result) {
            $data[$result['class']][$result['method']] = $result['action_id'];
        }
    }

    return $this->json($data, false);
}

//mod.vmg_yi_ecourse.php
public function set_module_note()
{
    $member_id = $this->helpers->member_id('CURRENT_MEMBER');
    $ecourse_id = $this->EE->input->post('ecourse_id');
    $chapter_id = $this->EE->input->post('chapter_id');
    $module_id = $this->EE->input->post('module_id');
    $note_text = $this->EE->input->post('note_text');

    $note_id = $this->EE->ecourse->set_module_note($member_id, $ecourse_id, $chapter_id, $module_id, $note_text);

    return $this->helpers->json(array('status' => ($note_id > 0 ? true : false), 'note_id' => $note_id));
}

//module/ecourse.php
public function set_module_note($member_id, $ecourse_id, $chapter_id, $module_id, $note_text, $note_id = null)
{
    $this->db->query("INSERT INTO exp_vmg_yi_ecourse_notes
        SET id = ?, created_at = NOW(), updated_at = NOW(), member_id = ?, ecourse_id = ?, chapter_row_id = ?, module_id = ?, note_text = ?
        ON DUPLICATE KEY UPDATE updated_at = NOW(), note_text = ?", array(
            $note_id,
            $member_id,
            $ecourse_id,
            $chapter_id,
            $module_id,
            $note_text,
            $note_text,
        ));

    return $this->db->insert_id();
}


//Javascript:


//_main.html
var appActionID = {exp:vmg_yi_helpers:action_id_json classes="Vmg_yi_ecourse|Vmg_yi_queue|Vmg_yi_chargify|Vmg_yi_stripe"};


// functions.js
$('.js-ecourse-note-add').on('submit', function(e) {
  e.preventDefault();
  var $this = $(this);

  var postData = {
    'ACT': appActionID.Vmg_yi_ecourse.set_module_note,
    'ecourse_id': $this.data('ecourse-id'),
    'chapter_id': $this.data('chapter-id'),
    'module_id': $this.data('module-id'),
    'note_text': $this.find('input[name="note"]').val(),
  };

  $.post('/', postData, function(response) {
    if (response.status) {
      $('<li>' + postData.note_text + ' <a class="js-ecourse-note-delete" data-note-id="' + response.note_id + '" href="#">(X)</a></li>')
        .insertBefore($this.closest('li'));
      $this.find('input[name="note"]').val('');
    }
  }, 'json');
});